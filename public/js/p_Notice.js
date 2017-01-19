(function () {
    Pithy.p_Notice = p_Notice;
    p_Notice.renders = {
        'default': '<div>${info}<span></span></div>'
    };
    function p_Notice(info) {
        this._info = info;
        this._agent = this;
    }

    p_Notice.prototype = {
        getRender: function(render) {
            return p_Notice[render];
        },
        buildRender: function(render) {
            if(!render) {
                render = "default";
            }
            var html = this.getRender(render);

            return juicer(html, this._info);
        },
        build: function(jParentDiv) {
            if(!jParentDiv) {
                jParentDiv = $(".container");
            }
            this._jParentDiv = jParentDiv;
            this._jWrap = this._jParentDiv;
            var render = this.buildRender(this._info.render);
            this._jControl = $(render);
            this._jWrap.append(this._jControl);
        }
    };
})();