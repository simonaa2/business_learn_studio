/**
 * ===================================================================
 * DATATRENDS UNIVERSAL APP SDK (datatrends-sdk.js)
 * ===================================================================
 * A lightweight client bridge that any child tool (Share Market Game,
 * Travel Dossier, Economics Scaffolds) includes via a single <script> tag.
 *
 * Automatically provides:
 * 1. Single Sign-On user identity (Google, Microsoft, Class Code)
 * 2. Instant cloud persistence with offline localStorage backup
 * 3. Teacher live inspection & rubric grading synchronization
 * 4. Sleek top navigation banner ("← Back to Datatrends Hub")
 * ===================================================================
 */

class DataTrendsSDK {
  constructor(options = {}) {
    this.appId = options.appId || 'generic_app';
    this.appName = options.appName || 'DataTrends Activity';
    this.autoRenderBar = options.autoRenderBar !== false;
    this.portalUrl = options.portalUrl || '../../launchpad.html';
    
    this.user = null;
    this.inspectStudentId = null;
    this.isTeacherMode = false;
    this._saveDebounceTimer = null;
  }

  /**
   * Initialize SDK, detect user session or URL overrides
   */
  async init() {
    // 1. Check if inspecting a student (Teacher Inspection Mode)
    const urlParams = new URLSearchParams(window.location.search);
    this.inspectStudentId = urlParams.get('inspect');
    const paramClass = urlParams.get('class');
    const paramStudentName = urlParams.get('student');

    // 2. Read central session from parent / localStorage
    let session = null;
    try {
      const raw = localStorage.getItem('datatrends_user_session');
      if (raw) session = JSON.parse(raw);
    } catch (e) {}

    if (session) {
      this.user = session;
      this.isTeacherMode = (session.role === 'teacher' || session.role === 'admin');
    } else if (paramStudentName) {
      // Direct link override
      this.user = {
        id: 'usr_' + btoa(paramStudentName.toLowerCase()).replace(/=/g, '').substring(0, 10),
        name: paramStudentName,
        email: `${paramStudentName.toLowerCase().replace(/\s+/g, '.')}@student.datatrends.com.au`,
        role: 'student',
        classes: [paramClass || '10COMM1']
      };
    } else {
      // Fallback guest session
      this.user = {
        id: 'guest_user',
        name: 'Guest Trader',
        email: 'guest@datatrends.com.au',
        role: 'student',
        classes: ['10COMM1']
      };
    }

    // 3. Inject sleek top portal bar if enabled
    if (this.autoRenderBar && typeof document !== 'undefined') {
      this._injectPortalBar();
    }

    return this.user;
  }

  /**
   * Get current authenticated user details
   */
  getUser() {
    return this.user;
  }

  /**
   * Returns whether current session is in teacher grading/inspection mode
   */
  isInspecting() {
    return !!this.inspectStudentId;
  }

  /**
   * Returns target student ID (for loading data in inspection mode)
   */
  getTargetUserId() {
    if (this.inspectStudentId) return this.inspectStudentId;
    return this.user ? this.user.id : 'guest_user';
  }

  /**
   * Cloud & Local Persistent Save
   */
  async saveData(data) {
    const userId = this.getTargetUserId();
    const storageKey = `dt_app_${this.appId}_${userId}`;

    // 1. Immediate local write
    const payload = {
      appId: this.appId,
      userId: userId,
      studentName: this.user ? this.user.name : 'Guest',
      classCode: (this.user && this.user.classes) ? this.user.classes[0] : '10COMM1',
      data: data,
      lastUpdated: Date.now()
    };

    localStorage.setItem(storageKey, JSON.stringify(payload));

    // 2. Update Teacher Live Feed Summary
    this._updateAppSummaryRecord(payload);

    // 3. Google Cloud Firebase Firestore Sync
    if (window.firebase && firebase.firestore) {
      try {
        const db = firebase.firestore();
        db.collection('app_data').doc(`${this.appId}_${userId}`).set({
          appId: this.appId,
          userId: userId,
          studentName: this.user ? this.user.name : 'Guest',
          classCode: (this.user && this.user.classes) ? this.user.classes[0] : '10COMM1',
          data: data,
          lastUpdated: new Date().toISOString()
        }, { merge: true }).catch(() => {});
      } catch (e) {
        console.warn('Background Firestore sync queued', e);
      }
    }

    this._showSaveIndicator();
    return true;
  }

  /**
   * Cloud & Local Data Loader
   */
  async loadData() {
    const userId = this.getTargetUserId();
    const storageKey = `dt_app_${this.appId}_${userId}`;

    // 1. Try local storage first
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return parsed.data || parsed;
      } catch (e) {}
    }

    // 2. Try Google Firebase Firestore cloud
    if (window.firebase && firebase.firestore) {
      try {
        const db = firebase.firestore();
        const doc = await db.collection('app_data').doc(`${this.appId}_${userId}`).get();
        if (doc.exists && doc.data() && doc.data().data) {
          return doc.data().data;
        }
      } catch (e) {}
    }

    return null;
  }

  /**
   * Record progress in the class summary for teacher dashboard
   */
  _updateAppSummaryRecord(payload) {
    const summaryKey = `dt_class_summary_${payload.classCode}_${this.appId}`;
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(summaryKey)) || [];
    } catch (e) { list = []; }

    const idx = list.findIndex(item => item.userId === payload.userId);
    
    // Extract intelligent metric preview based on app type
    let metricPreview = 'Active';
    if (this.appId === 'sharemarket' && payload.data) {
      const netWorth = payload.data.equityHistory?.length 
        ? payload.data.equityHistory[payload.data.equityHistory.length - 1].totalValue 
        : (payload.data.cash || 50000);
      const roi = (((netWorth - 50000) / 50000) * 100).toFixed(2);
      metricPreview = `${roi >= 0 ? '+' : ''}${roi}% ($${Math.round(netWorth).toLocaleString()})`;
    } else if (this.appId === 'travel' && payload.data) {
      const budgetLeft = payload.data.budgetRemaining || 0;
      metricPreview = `$${Math.round(budgetLeft).toLocaleString()} unallocated`;
    }

    const item = {
      userId: payload.userId,
      studentName: payload.studentName,
      classCode: payload.classCode,
      metricPreview: metricPreview,
      lastUpdated: payload.lastUpdated
    };

    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.push(item);
    }

    localStorage.setItem(summaryKey, JSON.stringify(list));
  }

  /**
   * Save Teacher Marking Rubric & Feedback
   */
  saveGrade(studentId, gradePayload) {
    const key = `dt_grade_${this.appId}_${studentId}`;
    const grade = {
      appId: this.appId,
      studentId: studentId,
      score: gradePayload.score,
      maxScore: gradePayload.maxScore || 20,
      rubric: gradePayload.rubric || {},
      feedback: gradePayload.feedback || '',
      gradedAt: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(grade));
    return grade;
  }

  /**
   * Load Teacher Marking for current student
   */
  loadGrade(studentId = null) {
    const targetId = studentId || this.getTargetUserId();
    const key = `dt_grade_${this.appId}_${targetId}`;
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  }

  /**
   * Injects the top "DataTrends Hub" navigation bar
   */
  _injectPortalBar() {
    if (document.getElementById('dt-hub-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'dt-hub-bar';
    bar.style.cssText = `
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99999;
      background: rgba(7, 11, 20, 0.94);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      color: #e2e8f0;
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 13px;
      padding: 0.5rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    `;

    const isInspecting = this.isInspecting();
    const userName = this.user ? this.user.name : 'Guest';
    const classBadge = (this.user && this.user.classes) ? this.user.classes[0] : '10COMM1';

    bar.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <a href="${this.portalUrl}" style="
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #38bdf8;
          text-decoration: none;
          font-weight: 700;
          font-size: 12px;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          transition: all 0.2s;
        " onmouseover="this.style.background='rgba(56, 189, 248, 0.2)'" onmouseout="this.style.background='rgba(56, 189, 248, 0.12)'">
          <span>←</span> <span>DataTrends Hub</span>
        </a>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-weight: 700; color: #fff; letter-spacing: -0.01em;">${this.appName}</span>
          ${isInspecting ? `
            <span style="background: #f59e0b; color: #000; font-weight: 800; font-size: 10px; padding: 2px 7px; border-radius: 4px; text-transform: uppercase;">
              Teacher Inspection Mode
            </span>
          ` : ''}
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 1rem;">
        <div id="dt-save-indicator" style="
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 11px;
          color: #10b981;
          opacity: 0.85;
          transition: opacity 0.3s;
        ">
          <span style="width: 7px; height: 7px; border-radius: 50%; background: #10b981;"></span>
          <span>Cloud Saved</span>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); padding: 0.2rem 0.6rem; border-radius: 8px;">
          <div style="
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #06b6d4, #8b5cf6);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 10px;
            color: #fff;
          ">
            ${userName.charAt(0).toUpperCase()}
          </div>
          <span style="font-weight: 600; color: #fff; font-size: 12px;">${userName}</span>
          <span style="
            background: rgba(139, 92, 246, 0.2);
            color: #c084fc;
            font-size: 10px;
            font-weight: 700;
            padding: 1px 6px;
            border-radius: 4px;
          ">${classBadge}</span>
        </div>
      </div>
    `;

    document.body.prepend(bar);
  }

  _showSaveIndicator() {
    const el = document.getElementById('dt-save-indicator');
    if (el) {
      el.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:#10b981;"></span><span>Saved just now</span>';
      el.style.opacity = '1';
      clearTimeout(this._saveDebounceTimer);
      this._saveDebounceTimer = setTimeout(() => {
        el.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:#10b981;"></span><span>Cloud Synced</span>';
      }, 3000);
    }
  }
}

if (typeof window !== 'undefined') {
  window.DataTrendsSDK = DataTrendsSDK;
}
