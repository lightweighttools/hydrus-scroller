let apiKey = '567cfb76f9da116b8cf2ed112d6cc508e6fdf6b6a723656aa31d620847c42376'
let appPort = '45869'
var imageIdsPool = []
var spareImageIds = []
var usedImageIds = []

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
            
            Array.from({length: 9}, (x) => loadImage() )
        }
    )
})

let clearImages = () => {

}

let loadImage = () => {
    // find shortest column
    let imageCols = $('#images-container').find('.stretch-column')
    var shortestCol = $(imageCols[0])

    imageCols.each((index, elem) => {
        let colHeight = 0
        
        $(elem).height()

        

        if (colHeight < shortestCol.height()) {
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
    shortestCol.append('<img src="http://localhost:45869/get_files/file?file_id=' + nextId + '&Hydrus-Client-API-Access-Key=567cfb76f9da116b8cf2ed112d6cc508e6fdf6b6a723656aa31d620847c42376">')
}


// [5211, 5145, 5137, 5105, 5103, 5077, 5051, 5039, 5021, 5015, 5003, 4997, 4987, 4977, 4973, 4969, 4941, 4933, 4911, 4879, 4857, 4855, 4851, 4839, 4835, 4827, 4753, 4741, 4699, 4677, 4625, 4611, 4579, 4567, 4557, 4481, 4477, 4415, 4405, 4395, 4391, 4387, 4381, 4371, 4355, 4353, 4317, 4295, 4285, 4243, 4237, 4207, 4181, 4157, 4149, 4127, 4123, 4087, 4083, 4057, 4047, 4039, 4033, 4023, 4017, 4011, 4007, 4005, 3999, 3973, 3899, 3893, 3857, 3841, 3831, 3819, 3755, 3753, 3709, 3703, 3683, 3677, 3651, 3629, 3619, 3603, 3591, 3567, 3551, 3541, 3505, 3493, 3473, 3469, 3465, 3435, 3403, 3375, 3335, 3323, 3311, 3309, 3275, 3231, 3213, 3189, 3161, 3121, 3083, 3073, 3063, 3047, 3033, 3017, 2983, 2981, 2971, 2933, 2909, 2891, 2881, 2859, 2843, 2837, 2823, 2807, 2787, 2733, 2731, 2729, 2725, 2717, 2673, 2667, 2663, 2643, 2637, 2587, 2579, 2551, 2547, 2439, 2437, 2415, 2391, 2379, 2375, 2363, 2337, 2325, 2321, 2313, 2245, 2241, 2235, 2219, 2207, 2205, 2179, 2177, 2173, 2161, 2155, 2143, 2125, 2107, 2079, 2053, 2047, 2027, 1967, 1927, 1915, 1897, 1893, 1891, 1883, 1881, 1859, 1849, 1815, 1787, 1713, 1683, 1641, 1611, 1599, 1579, 1571, 1529, 1505, 1491, 1431, 1429, 1419, 1377, 1363, 1339, 1333, 1321, 1291, 1287, 1265, 1231, 1157, 1131, 1095, 1091, 1079, 1051, 1023, 1017, 1009, 979, 961, 947, 899, 887, 859, 851, 829, 783, 779, 761, 749, 731, 679, 675, 657, 643, 635, 633, 629, 619, 617, 615, 603, 599, 581, 575, 549, 547, 515, 501, 481, 477, 469, 449, 439, 421, 405, 395, 393, 375, 327, 269, 161, 155, 5]

// 'http://localhost:45869/get_files/file?file_id=5211&Hydrus-Client-API-Access-Key=567cfb76f9da116b8cf2ed112d6cc508e6fdf6b6a723656aa31d620847c42376'