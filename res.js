
$(function(){


    var postIds;

    if (localStorage.length) {
        parseStorage();
    }else{
        // Initial parse
        $.getJSON('json/posts.json', function (data) {

            // map data
            postIds = data.forEach(function(post){
                var str = JSON.stringify(post);
                localStorage.setItem(post.id, str);
                return post.id;
            });

            initParse(data);
        });
    };


    function initParse(posts) {
        // console.log(typeof posts);
        posts.forEach(function(post) {
            var html = '<article class="post_' + post.id + '"><header><h3>';

            html += post.title + '</h3></header><section><p>';
            html += post.body + '</p></section><footer>';

            if (post.tags) {

                html += '<div class="tags">';

                post['tags'].forEach(function(tag){
                    html += '<button class="btn btn-xs btn-default">' + tag + '</button>';
                })

            }
            html += '</div><div class="controls"><a class="btn btn-danger btn-mini remove" data-post="' + post.id + '">удалить</a></div>';

            html += '</footer></article>';

            $('#posts').append(html);
        });
    }

    function parseStorage () {
        for(var num in localStorage){

            var mutable = localStorage.getItem(num);
                mutable = JSON.parse(mutable);

            var html = '<article class="post_' + mutable.id + '"><header><h3>';

            html += mutable.title + '</h3></header><section><p>';
            html += mutable.body + '</p></section><footer>';

            if (mutable.tags) {

                html += '<div class="tags">';

                mutable['tags'].forEach(function(tag){
                    html += '<button class="btn btn-xs btn-default">' + tag + '</button>';
                })

            }
                html += '</div><div class="controls"><a class="btn btn-danger btn-mini remove" data-post="' + mutable.id + '">удалить</a></div>';

            html += '</footer></article>';

            $('#posts').append(html);
        }
    }



    // EVENT HANDLERS

    $(".remove").on("click", function (e) {
        // Smth wrong with first delete post, can understand problem(
        var target = $(e.target);
        var id = target.attr("data-post");

        $("article.post_" + id).hide("slow", function () {
            $(this).remove();
        });


        localStorage.removeItem(id);
    });


    $("#post-add").on("submit", function (e) {
        var title = this.title,
            body = this.body,
            tags = this.tags;
        var newPostId = (Math.random()*100).toFixed();

        var post = {
            id : newPostId,
            title: title.value,
            body : body.value,
            tags : tags.value.split(",")
        };

        localStorage.setItem(newPostId, JSON.stringify(post));
    });
})
