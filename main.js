/**
 * Landing Page Config
 */
var config = {
  recentActivityIntervalDuration: 10, // seconds
  recentActivities: [
    {
      avatarImageUrl: 'Img/8.jpg',
      username: 'Sam',
      time: 'few hours ago',
      instagramProfileUrl: 'https://onlyfans.com/samslayres'
    },
    {
      avatarImageUrl: 'Img/5.jpg', // or: avatarImageUrl: 'https://i.imgur.com/',
      username: 'Belle Delphine',
      time: 'few hours ago',
      instagramProfileUrl: 'https://onlyfans.com/belledelphine'
    },
    {
      avatarImageUrl: 'Img/6.jpg',
      username: 'Mia Malkova',
      time: 'few minutes ago',
      instagramProfileUrl: 'https://onlyfans.com/miamalkova'
    },
    {
      avatarImageUrl: 'Img/7.jpg',
      username: 'Mia K.',
      time: 'few minutes ago',
      instagramProfileUrl: 'https://onlyfans.com/miakhalifa'
    },
    {
      avatarImageUrl: 'Img/4.jpg',
      username: 'Corinna Kopf',
      time: 'few minutes ago',
      instagramProfileUrl: 'https://onlyfans.com/corinnakopf'
    },
    {
      avatarImageUrl: 'Img/10.png',
      username: 'Riley Reid',
      time: 'few seconds ago',
      instagramProfileUrl: 'https://onlyfans.com/rileyreidx3'
    },
    {
      avatarImageUrl: 'Img/3.jpg',
      username: 'Asa Akira',
      time: 'few seconds ago',
      instagramProfileUrl: 'https://onlyfans.com/asaakira'
    },
    // add more recent activities here. Will be displayed last.
  ]
}

/**
 * Utility functions
 */
var util = {
  animate: function(element, animationName, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(element).addClass('animated ' + animationName).one(animationEnd, function() {
      $(element).removeClass('animated ' + animationName);
      if (typeof callback === 'function') { callback() }
    })
  }
}

/**
 * App VM
 */
var app = {
  state: {
    username: undefined,
    displayingSection: 'badge-generator'
  },
  init: function() {
    util.animate('.badge-generator', 'fadeInDown');
    recentActivity.init();
  },
  displayFromTo: function(fromSection, toSection) {
    util.animate('.' + fromSection, 'fadeOutUp', function() {
      $('.' + fromSection).hide();
      $('.' + toSection).show();
      util.animate('.' + toSection, 'fadeInDown');
    })
    $('body').animate({ scrollTop: 0 }, "slow");
    app.state.displayingSection = toSection;
  }
}



  

var recentActivity = {
  state: {
    activities: config.recentActivities,
    interval: undefined
  },
  init: function() {
    var initialActivities = [
      this.state.activities[0],
      this.state.activities[1],
      this.state.activities[2],
      this.state.activities[3],
      this.state.activities[4],
      this.state.activities[5]
    ];
    for(i=0;i<6;i++) {
      var activityHtml = this.createHtml(initialActivities[i]);
      this.appendHtml(activityHtml);
    }
    this.state.activities.splice(0, 5);
    this.startInterval();
  },
  startInterval: function() {
    if (this.state.activities.length > 0) {
      this.state.interval = window.setInterval(function() {
        activityHtml = recentActivity.createHtml(recentActivity.state.activities[0]);
        recentActivity.appendHtml(activityHtml);
        $('.activities').animate({ scrollTop: 0 }, "slow");
      }, config.recentActivityIntervalDuration*1000);
    } else {

    }
  },
  createHtml: function
(activity) {
    var activityHtml = "<a href='"+activity.instagramProfileUrl+"' target='blank'><div class='activity animated fadeInDown'><div class='activity-content'><img class='activity-avatar' src='"+activity.avatarImageUrl+"' /><p>"+activity.username+"</p><img class='activity-badge' src='Img/badge.png' /></div><div class='activity-timestamp'><p>"+activity.time+"</p></div></div></a>";
    return activityHtml;
  },
  appendHtml: function(activityHtml) {
    $('.activities').prepend(activityHtml);
  }
}

app.init();
