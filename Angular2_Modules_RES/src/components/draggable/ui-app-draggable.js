"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Draggable = (function () {
    function Draggable(element) {
        this.element = element;
        this.startPos = {
            x: 0,
            y: 0
        };
        this.isDragging = false;
        this.hasTopFixed = false;
        this.TOP_BOUND = 0;
        if ($('top-fixed').length > 0) {
            this.hasTopFixed = true;
            this.TOP_BOUND = $('top-fixed').height();
        }
    }
    Draggable.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var $dragTarget = $(_this.element.nativeElement);
            if (_this.dragTarget)
                $dragTarget = $(_this.dragTarget, _this.element.nativeElement);
            $dragTarget.on('mousedown', function (event) {
                if (!_this.isDragging && !$(event.target).is('button')) {
                    _this.startPos.x = event.pageX;
                    _this.startPos.y = event.pageY;
                    _this.isDragging = true;
                    $(document).on('selectstart', function (event) { return false; });
                    if (_this.hasTopFixed)
                        $('body').append('<div id="drag-bound" style="position: absolute; width: 100%; height: ' + _this.TOP_BOUND + 'px; top: 0; left: 0; z-index: 10001;"></div>');
                }
            });
            $(document).on('mousemove', function (event) {
                if (_this.isDragging) {
                    var newPos = {
                        left: ($(_this.element.nativeElement).offset().left + event.pageX - _this.startPos.x),
                        top: ($(_this.element.nativeElement).offset().top + event.pageY - _this.startPos.y)
                    };
                    var viewportWidth = $(window).width();
                    var viewportHeight = $(window).height();
                    var modalWidth = $(_this.element.nativeElement).width();
                    var modelHeight = $(_this.element.nativeElement).height();
                    $(_this.element.nativeElement).offset({
                        left: (newPos.left < 0) ? 0 : ((newPos.left + modalWidth) > viewportWidth ? (viewportWidth - modalWidth) : newPos.left),
                        top: (newPos.top < _this.TOP_BOUND) ?
                            _this.TOP_BOUND :
                            ((newPos.top + modelHeight - _this.TOP_BOUND) > viewportHeight ?
                                (viewportHeight - modelHeight + _this.TOP_BOUND) < _this.TOP_BOUND ?
                                    _this.TOP_BOUND :
                                    (viewportHeight - modelHeight + _this.TOP_BOUND) :
                                newPos.top)
                    });
                    _this.startPos.x = event.pageX;
                    _this.startPos.y = event.pageY;
                }
            });
            $(document).on('mouseup', function () {
                if (_this.isDragging) {
                    _this.isDragging = false;
                    $(document).off('selectstart');
                    if (_this.hasTopFixed)
                        $('#drag-bound').remove();
                }
            });
        }, 100);
    };
    __decorate([
        core_1.Input('ui-draggable'), 
        __metadata('design:type', String)
    ], Draggable.prototype, "dragTarget", void 0);
    Draggable = __decorate([
        core_1.Directive({
            selector: '[ui-draggable]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Draggable);
    return Draggable;
}());
exports.Draggable = Draggable;
//# sourceMappingURL=ui-app-draggable.js.map