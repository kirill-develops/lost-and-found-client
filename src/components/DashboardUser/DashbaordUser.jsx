import './DashboardUser.scss';
import React from 'react';

const dashboardUser = ({ userData }) => (
  <div className="dashboard-user">
    <h1 className="dashboard-user__title">Dashboard</h1>
    <div className="dashboard-user__block">
      <div className="dashboard-user__filler" />
      <div className="dashboard-user__frame">
        <div className="dashboard-user__card--avatar">
          <img
            className="dashboard-user__avatar"
            src={userData.avatar_url}
            alt={`${userData.first_name} avatar`}
          />
        </div>
        <div className="dashboard-user__card">
          <h3 className="dashboard-user__card-title">Messenger</h3>
          <h3 className="dashboard-user__card-label">
            New Contacts:
            <span className="dashboard-user__card-body"> 1</span>
          </h3>
          <h3 className="dashboard-user__card-label">
            Awaiting Replies:
            <span className="dashboard-user__card-body"> 3</span>
          </h3>
          <h3 className="dashboard-user__card-cta">View All </h3>
        </div>
        <div className="dashboard-user__card">
          <h3 className="dashboard-user__card-title">User Metrics</h3>
          <h3 className="dashboard-user__card-label">
            Open Offers:
            <span className="dashboard-user__card-body"> 3</span>
          </h3>
          <h3 className="dashboard-user__card-label">
            Open Seeking:
            <span className="dashboard-user__card-body"> 1</span>
          </h3>
          <h3 className="dashboard-user__card-cta">User Posts</h3>
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(dashboardUser);
