// auto scroller logic
let scrollSpeed = 2
var scrollCounter
var autoScrolling = false
let startScrolling = () => {
    let scrollable = $('#images-container')[0]
    autoScrolling = true

    if (scrollable.scrollHeight > scrollCounter) {
        scrollCounter += scrollSpeed
    } else {
        scrollCounter = scrollable.offsetHeight
    }

    scrollable.scrollTop = scrollCounter
    scroller = window.requestAnimationFrame(startScrolling)
  
    if (scrollCounter >= scrollable.scrollHeight) {
        window.cancelAnimationFrame(scroller)
        autoScrolling = false
    }
}

$('#start-scroll').on('click', () => {
    scrollCounter = $('#images-container').scrollTop()
    startScrolling()
})

$('#stop-scroll').on('click', () => {
    if (autoScrolling) {
        window.cancelAnimationFrame(scroller)
        autoScrolling = false
    }
})

$(window).on('wheel', (evt) => {
    let wheelDirection = evt.originalEvent.wheelDelta
    if (autoScrolling) {
        window.cancelAnimationFrame(scroller)
        autoScrolling = false
        // keep using autoscroll if scrolling down
        if (wheelDirection < 0) {
            setTimeout(() => {
                scrollCounter = $('#images-container').scrollTop()
                startScrolling()
            }, 200)
        }
    }
})