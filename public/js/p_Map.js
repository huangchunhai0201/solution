(function () {
    Pithy.p_Map = p_Map;


    function p_Map(info) {
        this._info = info;
        this._agent = this;
    }

    p_Map.prototype = {
        getMap: function() {
            return this._map;
        },
        init: function(jDivId) {
            this._map = new AMap.Map(jDivId, {
                resizeEnable: true,
                zoom:11
                // center: [116.397428, 39.90923]
            });
            if (!this._info.cityName) {
                this._info.cityName = '南京';
            }
            this._map.setCity(this._info.cityName);
        }
    };
})();