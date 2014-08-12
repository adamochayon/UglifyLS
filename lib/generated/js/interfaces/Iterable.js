//#Iterable

//### LiteScript Iterable implementation without generators

//##Comparision

//### Actual ES6 Implementation

//ES6 implements iterables by using generators. You have several concepts:

//a) The "Iterable" *interface* consisting of a method "@@iterator()" 
//returning a function which in turns returns a object 
//which supports the "iterator" interface. 
//(ES6 core classes @@iterator() returns a *generator*)

//b) The "Iterator" *interface* consisting of a method "next" returning the next object in the sequence. 
//(*generators* support the *Iterator* interface, they have a method "next()")

//So basically generators API is designed to conform the *Iterable* and *Iterator* interfaces.

//#### To make your own class *iterable* in ES6 you need to:

//a) add a method to YourClass which returns a object with a method next(). So you will need to:

//a.1) create *another* class, YourClassIterator with a method next(). Store internal state inside
//YourClassIterable or make method next() a generator. 
//method next() should return a *object* with two properties {done:false,value:[next object in sequence]}

//a.2) add a method @@iterator to YourClass, returning new YourClassIterator()

//### LiteScript Simplified Implementation

//LiteScript simplifies iterable to a core class *Iterable.Position* (a generic "cursor") 
//and a single interface *iterable*

//a) The *Iterable.Position* core class, abstracts the position inside an iterable sequence.

    //public class Position
    // constructor
    function Position(){ // default constructor
        //properties 
            //key, value 
            //index = -1
            //size 
            //extra 
            this.index=-1;
    };
    
    // export
    module.exports.Position = Position;
    
    // end class Position

//b) The *Iterable* "interface" consistis of a method "iterableNext(pos:Position)", advancing
//"pos" to the next item in the sequence and returning false if there is no more items.

//### To make your own class *iterable* in LiteScript you need to:

//a) add to YourClass a `method iterableNext(pos:Position)` returning false if there is no more items.

//b) nothing more. just a)    

//### core classes *iterable* interface implementation in LiteScript

    //append to class Array
    

        //shim method iterableNext(iter:Position) [not enumerable]
        if (!Object.prototype.hasOwnProperty.call(Array.prototype,'iterableNext'))
        Object.defineProperty(
        Array.prototype,'iterableNext',{value:function(iter){

            //var inx = iter.index
            var inx = iter.index;

            //if inx is -1 //initialization
            if (inx === -1) { //initialization
                //iter.size = this.length
                iter.size = this.length;
            };

            //if ++inx >= iter.size, return false
            if (++inx >= iter.size) {return false};

            //iter.key   = inx
            iter.key = inx;
            //iter.value = this[inx]
            iter.value = this[inx];

            //iter.index = inx
            iter.index = inx;
            //return true
            return true;
        }
        ,enumerable:false
        });


    //append to class Object
    

        //shim method iterableNext(iter:Position) [not enumerable]
        if (!Object.prototype.hasOwnProperty.call(Object.prototype,'iterableNext'))
        Object.defineProperty(
        Object.prototype,'iterableNext',{value:function(iter){

            //var inx = iter.index
            var inx = iter.index;

            //if inx is -1 //initialization
            if (inx === -1) { //initialization
                //iter.extra = Object.keys(this)
                iter.extra = Object.keys(this);
                //declare iter.extra:array
                
                //iter.size = iter.extra.length
                iter.size = iter.extra.length;
            };

            //if ++inx >= iter.size, return false
            if (++inx >= iter.size) {return false};

            //iter.key   = iter.extra[inx] //property name
            iter.key = iter.extra[inx]; //property name
            //iter.value = this[iter.key] //property value
            iter.value = this[iter.key]; //property value

            //iter.index = inx
            iter.index = inx;
            //return true
            return true;
        }
        ,enumerable:false
        });


    //append to class String
    

        //shim method iterableNext(iter:Position) [not enumerable]
        if (!Object.prototype.hasOwnProperty.call(String.prototype,'iterableNext'))
        Object.defineProperty(
        String.prototype,'iterableNext',{value:function(iter){

            //var inx = iter.index
            var inx = iter.index;

            //if inx is -1 //initialization
            if (inx === -1) { //initialization
                //iter.size = this.length
                iter.size = this.length;
            };

            //if ++inx >= iter.size, return false
            if (++inx >= iter.size) {return false};

            //iter.key   = inx
            iter.key = inx;
            //iter.value = this.substr(inx,1)
            iter.value = this.substr(inx, 1);

            //iter.index = inx
            iter.index = inx;
            //return true
            return true;
        }
        ,enumerable:false
        });

//Note: On LiteC-core (when compiling-to-c LiteScript source),
//the internal representation of strings is UTF-8.

//String.iterableNext keeps: 
//- *byte* index at Position.index
//- *codepoint* index at Position.key

//So to make portable code use *Position.key* as *codepoint* index
//and consider that:
//Position.key, *codepoint index* can be < Position.index *byte index*
//if the string contains multibyte UTF-8 codes.


    //shim import Map
    var Map = require('./../../../LiteScript/lib/interfaces/Map.js');

    //append to class Map
    

        //shim method iterableNext(iter:Position) [not enumerable]
        if (!Object.prototype.hasOwnProperty.call(Map.prototype,'iterableNext'))
        Object.defineProperty(
        Map.prototype,'iterableNext',{value:function(iter){

//Map is implemented with an internal js-Object used as dictionary

            //return Object.iterableNext.call(.dict,iter)
            return Object.iterableNext.call(this.dict, iter);
        }
        ,enumerable:false
        });


//###Notes on Position

//The "extra" property type and content, depends on each class implementing
//the *Iterable* interface. Should be used to store the state required
//to perform a fast `iteratorNext()`




