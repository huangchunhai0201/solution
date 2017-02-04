(function () {
    Pithy.p_Menu = p_Menu;

    p_Menu.renders = {
        'default': '<div class="p-menu">$${content}</div>'
    };

    function p_Menu(info) {
        this._info = info;
        this._agent = this;
    }


    p_Menu.prototype = {
        createMenuItem1: function (menu) {
            this._info.content += "<ul>";
            for (var i = 0; i < menu.length; i++) {
                var item = menu[i];
                if (item.icon) {
                    this._info.content += "<li class='p-menu-submenu'><div class='p-menu-submenu-title'><i class='icon anticon " + item.icon + "'></i>&nbsp;&nbsp;" + item.title + "</div>";
                } else {
                    this._info.content += "<li class='p-menu-submenu'><div class='p-menu-submenu-title'>" + item.title + "</div>";
                }
                if (item.subMenu) {
                    this.createMenuItem(item.subMenu);
                }
                this._info.content += "</ul></li>";
            }
        },
        build1: function (jParentDiv) {
            this._jWrap = $(jParentDiv);

            var menu = [
                {
                    title: 'item1',
                    icon: 'icon-enviromento',
                    key: 'sub1',
                    subMenu: [
                        {
                            title: 'item11',
                            icon: '',
                            key: 'sub2'
                        },
                        {
                            title: 'item12',
                            icon: '',
                            key: 'sub2'
                        }
                    ]
                },
                {
                    title: 'item2',
                    icon: 'icon-enviromento',
                    key: 'sub1',
                    subMenu: [
                        {
                            title: 'item21',
                            icon: '',
                            key: 'sub2'
                        },
                        {
                            title: 'item22',
                            icon: '',
                            key: 'sub2'
                        }
                    ]
                }
            ];
            this._info.content = "";
            this.createMenuItem1(menu);
            this._info.content += "</ul>";
            if (this._info.render) {
                this._jControl = juicer(this._info.render, this._info);
            } else {
                var render = 'default';
                var renderHtml = p_Menu.renders[render];
                this._jControl = juicer(renderHtml, this._info);
            }

            this._jWrap.html(this._jControl);
        },
        build: function (jParentDiv) {
            this._jWrap = $(jParentDiv);

            var menu = [
                    {
                        title: '测试1',
                        icon: 'icon-enviromento',
                        href: '/index/map'
                    },
                    {
                        title: '测试2',
                        icon: 'icon-hearto',
                        href: ''
                    }
            ];
            if (this._info.menu && this._info.menu.length > 0) {
                menu  = this._info.menu;
            } 
            var html = "<ul>";

            for (var i = 0, len = menu.length; i < len; i++) {
                var item = menu[i];
                html += "<a href='" + item.href + "'><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='icon anticon " + item.icon + "'></i>&nbsp;&nbsp;" + item.title + "</li></a>";
            }
            html += "</ul>";

            this._info.content = html;
            if (this._info.render) {
                this._jControl = juicer(this._info.render, this._info);
            } else {
                var render = 'default';
                var renderHtml = p_Menu.renders[render];
                this._jControl = juicer(renderHtml, this._info);
            }

            this._jWrap.html(this._jControl);
        }
    };
})();