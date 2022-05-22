/*
    - element tag control
    
    Key word list:
    - social media name
    - username
    - password
    - plase 
    - input
    - write
    - girin
    - kullanıcı adı
    - şifre
    - form
    
    
*/
var pgPoints = 0

var keyW = [
    "kullanıcı",
    "kullanici",
    "şifre",
    "account",
    "plase",
    "input",
    "enter",
    "instagram",
    "facebook",
    "username",
    "password",
    "giriş yap",
    "log in",
    "log in with facebook",
    "Forgot Password",
    "sign in",
    "forgot password",
    "get the app.",
    "phone",
    "number",
    "username",
    "email",
    "Phone number, username, or email"
]

var tagList = ["h1", "h2", "h3", "h4", "h5", "h6", "span", "p", "text", "li", "td", "tr", "pre", "ol"]



function warningDetection(pagePoints) {


    if (confirm("The page has a high danger score, be careful! Page Poinst: " + pagePoints +
        "\nDo you want to log out of the page?", "Be Careful Detection!") == true
    ) {
        window.location.href = window.history.back() // your previous url
    } else {
        //devam edildi.
    }
}


function urlControl() {

    let url = window.location.href
    var urlArr = url.split('/')

    for (let i = 0; i < urlArr.length; i++) {
        
        if ("www.instagram.com" == urlArr[i] || "www.facebook.com" == urlArr[i]) {
            return pgPoints = 0
        }

    }


}


function tagControl() {


    for (let i = 0; i < tagList.length; i++) {

        try {

            for (let j = 0; j < 100; j++) {

                var tagTxt = document.getElementsByTagName(tagList[i])[j].textContent

                keyW.forEach(item => {

                    if (item === tagTxt.toString().toLocaleLowerCase().trim()) {
                        pgPoints = pgPoints + 1
                        if (
                            tagTxt.toString().toLocaleLowerCase().trim() === "instagram" ||
                            tagTxt.toString().toLocaleLowerCase().trim() === "facebook"
                        ) {

                            urlControl()
                            if (pgPoints !== 0) {
                                warningDetection(pgPoints)
                            }
                        }

                    }
                })

            }


        } catch (error) {
            //undefined
        }
    }
}


function formConrol() {

    for (let i = 0; i < 10; i++) {

        try {

            if (
                document.getElementsByTagName("form")[i].name
                || document.getElementsByTagName("form")[i].className
                || document.getElementsByTagName("form")[i].id
                || document.getElementsByTagName("form")[i].method
            ) {

                pgPoints = pgPoints + 1

                if (pgPoints >= 1) {
                    tagControl()
                }

            }

        } catch (error) {
            //undefined
            return pgPoints
        }

    }
}


function start() {
    formConrol()
}

start()
