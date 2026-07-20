// ===========================
// TruthBox 主程式
// ===========================


// 目前設定
let currentCategory = "全部";

let currentQuestion = null;


// 已抽題目紀錄
let usedQuestions = JSON.parse(
    localStorage.getItem("usedQuestions")
) || [];


// 收藏
let favorites = JSON.parse(
    localStorage.getItem("favorites")
) || [];



// ===========================
// 元件
// ===========================

const questionBox =
document.getElementById("question");

const categoryName =
document.getElementById("categoryName");

const number =
document.getElementById("number");

const randomBtn =
document.getElementById("randomBtn");

const nextBtn =
document.getElementById("nextBtn");

const favoriteBtn =
document.getElementById("favoriteBtn");

const categories =
document.querySelectorAll(".category");

const darkBtn =
document.getElementById("darkBtn");

const resetBtn =
document.getElementById("resetBtn");

const favoriteListBtn =
document.getElementById("favoriteListBtn");

const favoritePanel =
document.getElementById("favoritePanel");

const favoriteList =
document.getElementById("favoriteList");

const closeFavorite =
document.getElementById("closeFavorite");




// ===========================
// 抽題
// ===========================


function drawQuestion(){


    let pool = questions.filter(q=>{


        if(currentCategory === "全部")
            return true;


        return q.category === currentCategory;


    });



    // 移除已抽

    let available = pool.filter(q=>{


        return !usedQuestions.includes(q.text);


    });



    // 全部抽完

    if(available.length === 0){


        alert("這個分類已經抽完，重新開始");


        usedQuestions = [];


        localStorage.removeItem(
            "usedQuestions"
        );


        available = pool;


    }



    let random =
    Math.floor(
        Math.random()*available.length
    );



    currentQuestion =
    available[random];



    usedQuestions.push(
        currentQuestion.text
    );


    localStorage.setItem(
        "usedQuestions",
        JSON.stringify(
            usedQuestions
        )
    );



    showQuestion();


}




// ===========================
// 顯示題目
// ===========================


function showQuestion(){


    categoryName.innerHTML =
    currentQuestion.category;


    questionBox.innerHTML =
    currentQuestion.text;



// 目前分類的題庫
    let pool = questions.filter(q => {

        if(currentCategory === "全部")
            return true;

        return q.category === currentCategory;

    });

    // 題庫總數
    let total = pool.length;

    // 已抽題數（只算目前分類）
    let used = pool.filter(q =>
        usedQuestions.includes(q.text)
    ).length;

    // 更新畫面
    number.innerHTML =
    `已抽 ${used} 題 / 題庫 ${total} 題`;



    // 動畫

    questionBox.classList.remove(
        "animate"
    );


    setTimeout(()=>{

        questionBox.classList.add(
            "animate"
        );

    },50);


}




// ===========================
// 分類切換
// ===========================


categories.forEach(btn=>{


    btn.onclick=function(){


        categories.forEach(b=>{

            b.classList.remove(
                "active"
            );

        });



        this.classList.add(
            "active"
        );


        currentCategory =
        this.dataset.category;



        usedQuestions=[];



        drawQuestion();


    }


});





// ===========================
// 收藏
// ===========================


favoriteBtn.onclick=function(){


    if(!currentQuestion)
        return;



    let exists =
    favorites.some(q=>
        q.text === currentQuestion.text
    );



    if(exists){


        alert(
            "已經收藏過了"
        );

        return;

    }



    favorites.push(
        currentQuestion
    );


    localStorage.setItem(
        "favorites",
        JSON.stringify(
            favorites
        )
    );


    alert(
        "❤️ 已收藏"
    );


};





// ===========================
// 顯示收藏
// ===========================


favoriteListBtn.onclick=function(){


    favoritePanel.classList.remove(
        "hidden"
    );


    favoriteList.innerHTML="";



    if(favorites.length===0){


        favoriteList.innerHTML =
        "<p>目前沒有收藏題目</p>";


        return;

    }



    favorites.forEach((q,index)=>{


        let div =
        document.createElement(
            "div"
        );


        div.className =
        "favorite-item";


        div.innerHTML =

        `
        <b>${index+1}.
        ${q.category}</b>
        <br>
        ${q.text}
        `;


        favoriteList.appendChild(
            div
        );


    });



};





closeFavorite.onclick=function(){


    favoritePanel.classList.add(
        "hidden"
    );

};




// ===========================
// 深色模式
// ===========================


darkBtn.onclick=function(){


    document.body.classList.toggle(
        "dark"
    );


    localStorage.setItem(

        "darkMode",

        document.body.classList.contains(
            "dark"
        )

    );


};



// 讀取深色設定

if(
localStorage.getItem("darkMode")
==="true"
){

    document.body.classList.add(
        "dark"
    );

}




// ===========================
// 重置
// ===========================


resetBtn.onclick=function(){


    if(
    confirm(
    "確定清除抽題紀錄？"
    )
    ){


        usedQuestions=[];


        localStorage.removeItem(
            "usedQuestions"
        );


        alert(
        "已重置"
        );


    }


};




// ===========================
// 按鈕事件
// ===========================


randomBtn.onclick =
drawQuestion;


nextBtn.onclick =
drawQuestion;



// 啟動

drawQuestion();

// ===========================
// PWA Service Worker
// ===========================


if(
"serviceWorker" in navigator
){

window.addEventListener(
"load",
()=>{


navigator.serviceWorker.register(
"./sw.js"
)
.then(()=>{

console.log(
"TruthBox Offline Ready"
);

});


});


}
