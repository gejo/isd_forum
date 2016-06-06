var assert = require('chai').assert;
describe('UpGoing', function() {

    describe('values and types', function() {
        it('should return null', function() {
            var a;
            assert.equal("undefined", typeof a);

            a = "hello world";
            assert.equal("string", typeof a);

            a = 42;
            assert.equal("number", typeof a);

            a = true;
            assert.equal("boolean", typeof a);

            a = null;
            assert.equal("object", typeof a);

            a = undefined;
            assert.equal("undefined", typeof a);

            a = [];
            assert.equal("object", typeof a);
        });
    });

    describe('coercion', function() {
        it('explicit coercion', function() {
            var a = "28";
            var b = Number(a);
            assert.equal("number", typeof b);
        });
        it('implicit coercion', function() {
            var a = "28";
            var b = 28;
            assert.equal(true, a == b);
            assert.equal(false, a === b);
        });
        it('array string equal', function() {
            var a = [1, 2, 3];
            var b = [1, 2, 3];
            var c = "1,2,3";
            assert.equal(true, a == c);
            assert.equal(true, b == c);
            assert.equal(false, a == b);
        });
        it('NaN equal', function() {
            var a = 28;
            var b = "foo";
            assert.equal(false, a > b);
            assert.equal(false, a < b);
            assert.equal(false, a == b);
        });
    });

    describe('closure', function() {
        it('should return a function', function() {
            var mirror1 = makeFun(1);
            assert.equal(1, mirror1());
        });
    });

    describe('this', function() {
        bar = "global";

        function foo() {
            return this.bar;
        }

        var obj1 = {
            bar: "obj1",
            foo: foo
        }
        var obj2 = {
            bar: "obj2",
        }

        var Programmer = function(language, skill) {
            this.language = language;
            this.skill = skill;
        }

        var joy = new Programmer("JavaScript", "1");
        var stike = Object.create(joy);
        stike.skill = 2;

        it('which object is this', function() {
            assert.equal("global", foo());
            assert.equal("obj1", obj1.foo());
            assert.equal("obj2", foo.call(obj2));
            assert.equal("1", joy.skill);
            assert.equal("2", stike.skill);
        });
    });

});


var makeFun = function(x) {

    return function() {
        return x;
    }

}
