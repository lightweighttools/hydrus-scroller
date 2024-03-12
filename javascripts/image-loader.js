let apiKey = '567cfb76f9da116b8cf2ed112d6cc508e6fdf6b6a723656aa31d620847c42376'
let appPort = '45869'
var imageIdsPool = []
var spareImageIds = []
var usedImageIds = []
let columns = 2

$('#submit-tags-list').on('click', () => {
    // build tags string
    let queriedTags = $('#tags-list').val().split(',')
    
    var tagsString = ''
    queriedTags.forEach((elem, index) => {
        tagsString += '"' + elem.trim() + '",'
    })
    tagsString = tagsString.slice(0, -1)
    tagsString = "[" + tagsString + "]"
    
    // query hydrus for ids
    $.get(
        "http://localhost:" + appPort + "/get_files/search_files",
        { tags: tagsString, 'Hydrus-Client-API-Access-Key': apiKey},
        (res) => {
            //
            imageIdsPool = res.file_ids
            spareImageIds = imageIdsPool
            usedImageIds = []
            clearImages()
            
            loadImages(2 * 5)
        }
    )
})

let clearImages = () => {

}

let loadImages = (numLoads) => {
    if (numLoads == 0) {
        return
    }
    // find shortest column
    let imageCols = $('#images-container').find('.stretch-column')
    var shortestCol = $(imageCols[0])

    imageCols.each((index, elem) => {
        let colHeight = getTotalColHeight($(elem))
        let shortestColHeight = getTotalColHeight(shortestCol)
        if (colHeight < shortestColHeight) {
            shortestCol = $(elem)
        }
    })

    // get next unused image id
    if (spareImageIds.length == 0) {
        spareImageIds = imageIdsPool
    }
    // remove from unused array
    let nextId = spareImageIds.pop()
    // put id into used array

    // append picture to column
    // shortestCol.append('<img src="http://localhost:45869/get_files/file?file_id=' + nextId + '&Hydrus-Client-API-Access-Key=567cfb76f9da116b8cf2ed112d6cc508e6fdf6b6a723656aa31d620847c42376">')
    // return shortestCol

    let nextImage = new Image()
    nextImage.onload = () => { loadImages(numLoads - 1) }
    nextImage.src = 'http://localhost:45869/get_files/file?file_id=' + nextId + '&Hydrus-Client-API-Access-Key=567cfb76f9da116b8cf2ed112d6cc508e6fdf6b6a723656aa31d620847c42376'
    shortestCol[0].appendChild(nextImage)
}

let getTotalColHeight = (column) => {
    var totalColHeight = 0
    let colChildren = column.children()
    colChildren.each((index, elem) => {
        totalColHeight += $(elem).height()
    })
    return totalColHeight
}