// Tab Navigation Fix for Back2School Earnie
// Add this code after the DOMContentLoaded event listener initialization

// Tab switching functionality for Dashboard and Admin screens
function initTabSwitching() {
  // Main dashboard tabs
  const dashboardTabs = document.querySelectorAll('#screenDashboard .nav-tab');
  dashboardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      
      // Remove active class from all tabs
      dashboardTabs.forEach(t => t.classList.remove('active'));
      
      // Hide all tab content
      document.getElementById('tabTasks')?.classList.add('hidden');
      document.getElementById('tabSupport')?.classList.add('hidden');
      document.getElementById('tabAbout')?.classList.add('hidden');
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Show corresponding tab content
      const tabContent = document.getElementById(tabName);
      if (tabContent) {
        tabContent.classList.remove('hidden');
      }
    });
  });

  // Admin dashboard tabs
  const adminTabs = document.querySelectorAll('#screenAdmin .nav-tab');
  adminTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-admin-tab');
      
      // Remove active class from all tabs
      adminTabs.forEach(t => t.classList.remove('active'));
      
      // Hide all admin tab content
      const adminTabContents = document.querySelectorAll('.admin-tab');
      adminTabContents.forEach(content => content.classList.add('hidden'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Show corresponding admin tab content
      const tabContent = document.getElementById(tabName);
      if (tabContent) {
        tabContent.classList.remove('hidden');
      }
    });
  });
}

// Call this function when pages load
export { initTabSwitching };
