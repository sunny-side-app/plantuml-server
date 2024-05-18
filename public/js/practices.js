var clicked_page_index = 1;

window.addEventListener("load", (event) => {
    fetch("/public/json/practices.json", {method: "GET"})
    .then(response => response.json())
    .then(function(practices_hashmap_arr){
        for (let i = 0; i < Object.keys(practices_hashmap_arr).length; i++) {
                // i = 0,5,..,20
                if(i % 5 == 0){
                    render_page_button((i / 5) + 1,practices_hashmap_arr,document.getElementById("page_button_group"));
                }
                render_table_cell(i,practices_hashmap_arr,document.getElementById("table_body"));
        }
    });
});

function render_page_button(page_index,practices_hashmap_arr,page_button_group){
    const li = document.createElement("li");
    // p stands for each square page button(Ex: 1,..,4)
    const p = document.createElement("p");

    p.setAttribute("id", "page"+page_index);

    p.innerHTML = page_index;
    // if and only if i = 0
    if(page_index == 1){
        p.classList.add("page-clicked-link","cursor-pointer");
    }
    else{
        p.classList.add("page-link","cursor-pointer");
    }
    
    p.addEventListener("click", function() {
        clicked_page_index = page_index;
        // 各ページボタンが押下されたときにグリッドの各レコードを更新する(表示を切り替える)
        for (let i = 0; i < Object.keys(practices_hashmap_arr).length; i++) {
            set_display_state(i,document.getElementById("table_content"+(i+1)));
        }
        
        // 選択しているページボタンから別のページボタンを選択した際の切り替えの制御で5は1ページあたりの表示レコード数
        for (let i = 1; i < Math.floor(Object.keys(practices_hashmap_arr).length / 5) + 1; i++) {
            const page_button = document.getElementById("page"+(i));

            if(i == clicked_page_index & page_button.classList.contains("page-link")){
                    page_button.classList.remove("page-link");
                    page_button.classList.add("page-clicked-link");
            }
            else{
                page_button.classList.remove("page-clicked-link");
                page_button.classList.add("page-link");
            }
        }
    });

    li.append(p);
    page_button_group.append(li);
}

function render_table_cell(index,practices_hashmap_arr,table_body){
    const row = document.createElement("tr");
    const cell_th_id = document.createElement("th");
    const cell_td_title = document.createElement("td");
    const cell_td_theme = document.createElement("td");

    row.setAttribute("id", "table_content"+(index+1));

    // cell_th_id.setAttribute("id", "id"+(index+1));
    // cell_td_title.setAttribute("id", "title"+(index+1));
    // cell_td_theme.setAttribute("id", "theme"+(index+1));

    cell_th_id.innerHTML = practices_hashmap_arr[index].id;
    cell_td_title.innerHTML = practices_hashmap_arr[index].title;
    cell_td_theme.innerHTML = practices_hashmap_arr[index].theme;

    row.classList.add("cursor-pointer");
    
    set_display_state(index,row);

    row.addEventListener("click", function() {
        localStorage.setItem("practice_data", JSON.stringify(practices_hashmap_arr[index]));
        window.location.href = "practice.php"+"?id="+cell_th_id.innerHTML;
    });

    row.append(cell_th_id);
    row.append(cell_td_title);
    row.append(cell_td_theme);
    table_body.append(row);
}

function set_display_state(index,table_row){
    // page_indexの値からtableへの表示/非表示を設定する
    // Ex: clicked_page_index = 1 when index = 0,..,4 (i=0,..,4), clicked_page_index = 2 when index = 5,..,9
    if((clicked_page_index-1) * 5 <= index & index < clicked_page_index * 5){
        table_row.style.display = "";
    }
    else{
        table_row.style.display = "none";
    }
}