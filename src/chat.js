(function (d, w, c) {
    w.BrevoConversationsID = '66cc4b10ebd6292e600f65f9';
    w[c] = w[c] || function () {
        (w[c].q = w[c].q || []).push(arguments);
    };

    // Set configuration for the widget
    w[c]('configure', {
        showIcon: true, // Ensure icon is shown
        hideOnPageLoad: false, // Optionally hide on page load
        iconPosition: 'bottom-left' // Specify where you want the icon to appear
    });

    var s = d.createElement('script');
    s.async = true;
    s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
    if (d.head) d.head.appendChild(s);
})(document, window, 'BrevoConversations');
