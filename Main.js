window.addEventListener('load', function () {
    let cp = new ColorPicker(0, 0, 0);

    cp.addChangeListener((cp) => {
        document.querySelector("#target").style.color = cp.getColorSpec();
    });

    document.querySelector("#control").append(cp.getDiv());    
});