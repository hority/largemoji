var kusoemoji = (function(){
    "use strict";
    var kusoemoji = function(emoji,size){
        this.emoji = emoji;
        this.size = size;
    };

    kusoemoji.prototype._createColorMap = function(){
        // mem-canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.size;
        canvas.height = this.size;
        var ctx = canvas.getContext("2d");
        // bg-white
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        // get metrix
        var m = ctx.measureText(this.emoji);
        // scale
        ctx.scale(canvas.width / m.width,canvas.height / m.width);
        // render
        ctx.textBaseline = "hanging";
        ctx.fillStyle = "black";
        ctx.fillText(this.emoji,0,0);
        // get pixel
        var pix = ctx.getImageData(0,0,canvas.width,canvas.height).data;
        // Loop over each pixel.
        var arr = new Array(this.size);
        for(var y=0;y<this.size;y++){
            arr[y] = new Array(this.size);
            for(var x=0;x<this.size;x++){
                var r = (y*this.size+x)*4;
                var g = r + 1;
                var b = g + 1;
                arr[y][x] = "rgb(" + [pix[r],pix[g],pix[b]].join(",") + ")";
            }
        }
        return arr;
    };

    kusoemoji.prototype._createDotElement = function(color){
        var elem = document.createElement("div");
        elem.textContent = this.emoji;
        elem.style.color = "transparent";
        elem.style.textShadow = "0 0 0 " + color;
        elem.style.fontSize = "7px";
        return elem;
    };

    kusoemoji.prototype.createTable = function(){
        var arr = this._createColorMap();
        var table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        for(var y=0;y<this.size;y++){
            var tr = document.createElement("tr");
            for(var x=0;x<this.size;x++){
                var td = document.createElement("td");
                td.style.padding = "0px";
                var dot = this._createDotElement(arr[y][x]);
                td.appendChild(dot);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        return table;
    };

    kusoemoji.prototype.appendTo = function(targetElement){
        var table = this.createTable();
        targetElement.appendChild(table);
    };

    return kusoemoji;
})();