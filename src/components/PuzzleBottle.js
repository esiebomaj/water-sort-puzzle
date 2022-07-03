import uuid from "react-uuid";

class PuzzleBottle {
  //  this class act as a stack
  //  with some customizations for this use case

  constructor(initBottle = [], complete = false, empty = false) {
    this._no_of_unit_to_full = 10;
    this._bottle_array = initBottle; //used as the stack data structure
    this.complete = complete;
    this.empty = empty;
    this.id = uuid();
  }

  get bottle_array() {
    // used to get the private bottle
    // done to avoid modifying _bottle_array from outside this class

    return this._bottle_array;
  }

  remove_from_top = (remove_count) => {
    // used to remove items from the top of the stack
    // but we can only remove a max of the topSize
    // i.e we can only remove one color at a time

    if (remove_count > this.getTopSize()) {
      throw Error("You cannot remove more than top size at a time");
    } else {
      let rt = [];
      while (remove_count > 0) {
        rt.push(this._bottle_array.pop());
        remove_count -= 1;
      }
      this.getTopSize();
      return rt;
    }
  };

  add_to_top = (colors_to_be_added) => {
    // adds colors_to_be_added to the top of the stack

    if (
      colors_to_be_added.length + this._bottle_array.length >
      this._no_of_unit_to_full
    ) {
      throw Error("Too many items to add");
    } else {
      this._bottle_array = [...this._bottle_array, ...colors_to_be_added];
      this.getTopSize();
    }
  };

  getTopSize = () => {
    // calculates and returns the size of the color on top of the stack
    // also sets this.complete and this.empty

    let topCount = 0;
    const topColor = this._bottle_array[this._bottle_array.length - 1];
    for (let i = this._bottle_array.length - 1; i >= 0; i--) {
      if (this._bottle_array[i] === topColor) {
        topCount += 1;
      } else {
        return topCount;
      }
    }

    if (this._bottle_array.length === this._no_of_unit_to_full) {
      this.complete = true;
    }

    if (this._bottle_array.length === 0) {
      this.empty = true;
      this.complete = false;
    }
    return topCount;
  };

  getEmptyTopSize = () => {
    return this._no_of_unit_to_full - this._bottle_array.length;
  };
}

export default PuzzleBottle;
