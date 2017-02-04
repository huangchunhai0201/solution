(function () {
    Pithy.p_Modal = p_Modal;
    p_Modal.renders = {
        "default": "<div class='p_modal'>" +
        "<div class='p-modal-content'>" +
        "<span class='p-modal-close'><i class='icon anticon icon-close'></i></span>" +
        "<div class='p-modal-header'>" +
        "<span class='p-modal-title'>${title}</span>" +
        "</div>" +
        "<div class='p-modal-body'>$${content}</div>" +
        "<div class='p-modal-footer'>" +
        "<button type='button' class='p_button'>关闭</button>" +
        "</div>" +
        "</div>" +
        "</div>"
    };

    function p_Modal(info) {
        this._info = info;
        this._agent = this;
    }

    p_Modal.prototype = {
        getRender: function (render) {
            return p_Modal.renders[render];
        },
        buildRender: function (render) {
            if (!render) {
                render = 'default';
            }
            var html = this.getRender(render);
            if (!this._info.content) {
                this._info.content = 'loading...';
            }
            return juicer(html, this._info);
        },
        build: function (jParentDiv) {
            var self = this;
            this._jParentDiv = $(jParentDiv);
            this._jWrap = $(jParentDiv);

            var renderHtml = this.buildRender(this._info.render);
            this._jControl = $(renderHtml);

            this._jWrap.append(this._jControl);

            var defaultPro = {
            };
            if (this._info.style) {
                $.extend(defaultPro, this._info.style);
            }
            this._jControl.css(defaultPro);

            this._jControl.find('.p-modal-close').on('click', function () {
                self._jControl.hide();
            });
        },
        open: function () {
            this._jControl.slideDown("fast");
        }
    };
})();