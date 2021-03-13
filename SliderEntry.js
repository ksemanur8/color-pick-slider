let SliderEntry = function(min, max, init) {

    this.getMin = function() {
        return min;
    };
    this.getMax = function() {
        return max;
    };
    this.getValue = function() {
        return range_slider.value;
    };
    // this way min, max, value can't be changed after declaration. 
    // if we did let getMin = function(), we wouldn't be able to reach
    // it outside of the contructor. by this.getMin, we can reach it 
    // like a property but we can't change the vaue of min.
    // using .prototype.sharedMethod would help save space but it doesn't
    // work here because min, max, init are parameters here.

    let update = () => {
        listeners.forEach((l) => {
            l(this); // this at time of function call, the object that is being updated
        })
    }
    
    this.setValue = function(new_value) {
        range_slider.value = new_value;
        entry.value = range_slider.value;
        update();
    }

    let entry_div = document.createElement('div');

    // entry_div.innerHTML = "<input type="range"><input type="text">";
    let range_slider = document.createElement('input');
    range_slider.setAttribute('type', 'range');
    range_slider.setAttribute('min', min);
    range_slider.setAttribute('max', max);
    range_slider.setAttribute('value', init);
    range_slider.style.width = "250px";

    let entry = document.createElement("input");
    entry.setAttribute('type', 'text');
    entry.style.width = "25px";
    entry.value = range_slider.value; //sets init value
    
    entry_div.append(range_slider);
    entry_div.append(entry);
    entry_div.style.width = "290px";

    this.getDiv = function() {
        return entry_div;
    }

    range_slider.addEventListener('input', () => {
        entry.value = range_slider.value;
        update();
    } )

    entry.addEventListener('keydown', (event) => {
        if(event.key == "Enter") {
            let new_value = parseInt(entry.value);
            if(!isNaN(new_value)) { //if it's a real number
            range_slider.value = new_value;
        }
        entry.value = range_slider.value;
        update(); // in case user sets to a number not in range, it replaces input box with min or max
    }
    //watches change of input, you can use arrow if you're not going to use this
    })

    let listeners = []; 
    this.addChangeListener = function(l) {
        listeners.push(l);
    }

};