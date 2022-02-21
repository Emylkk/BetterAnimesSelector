    inicializar();
    $("#navbarSupportedContent").append("<a class='unblock-all' href='#' style='height:fit-content;padding:3px;padding-top:-1px;width:fit-content;z-index:100;'>Resetar Bloqueios<img  src='" + img + "' /></a>");


    $(".unblock-all").on("click", function() {
        chrome.storage.sync.remove("animes")
        document.location.reload(true);
    });

    $(".block-anime").on("click", function() {

        $(this).parent().parent().css("display", "none");
        let anime = $(this).parent().children("h3").text();

        chrome.storage.sync.get("animes", function(result) {
            if (result.animes) {
                console.log("dentro")
                result.animes.push(anime)
                chrome.storage.sync.set({ "animes": result.animes }, function() {})

            } else {
                console.log("fora")
                chrome.storage.sync.set({ "animes": [anime] }, function() {})
            }
            chrome.storage.sync.get("animes", function(result) {
                console.log(result.animes)

            })
        });
    })

    function inicializar(params) {
        img = chrome.runtime.getURL("block.svg")
        $(".card-title").append("<a class='block-anime' href='#' style='border-radius:30%;cursor:no-drop;height:fit-content;padding:3px;padding-top:-1px;width:fit-content;background:rgba(0,0,0,0.6);z-index:100;'><img  src='" + img + "' /></a>");
        chrome.storage.sync.get("animes", function(result) {
            var resultado = result.animes
            $(".card-horizontal > a").each(function(index, tituloSite) {
                comparatitulo = tituloSite.getAttribute("title")
                resultado.forEach(animeBanco => {
                    if (comparatitulo.includes(animeBanco)) {
                        tituloSite.parentElement.style.opacity = "0.1"
                    }
                });

            });
        });
    }
    $("article a div img").first().on("load", function() {

        inicializar()
    });