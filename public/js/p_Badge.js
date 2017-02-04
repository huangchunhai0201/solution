(function () {
    Pithy.p_Badge = p_Badge;
    p_Badge.renders = {
        'default': '<div class="p_Badge">${label}<span>${count}</span></div>'
    };
    function p_Badge(info) {
        this._info = info;
        this._agent = this;
    }

    p_Badge.prototype = {
        getRender: function (render) {
            return p_Badge.renders[render];
        },
        buildRender: function (render) {
            if (!render) {
                render = "default";
            }
            var html = this.getRender(render);

            return juicer(html, this._info);
        },
        build: function (jParentDiv) {
            var self = this;
            if (!jParentDiv) {
                jParentDiv = $(".container");
            }
            this._jParentDiv = $(jParentDiv);
            this._jWrap = this._jParentDiv;
            var render = this.buildRender(this._info.render);
            this._jControl = $(render);
            this._jWrap.html(this._jControl);

            this._jControl.css({
                "cursor": "pointer"
            });
            this._jControl.hover(function () {
                self._jControl.css({
                    color: 'black'
                });
            }, function () {
                self._jControl.css({
                    color: '#FFFFFF'
                });
            });
            var p_modal = new Pithy.p_Modal({
                'title': '消息列表',
                'style': {
                    'width': '40%'
                },
                'content': '<p style="padding-left: 12px;">消息中心开发中。。。</p>'
            });
            p_modal.build('body');
            this._jControl.on('click', function () {
                p_modal.open();
            });

        }
    };
})();