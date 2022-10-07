const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, tutorials, totalPages, currentPage };
};

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

const filterPostData = (postBody) => {
    let post_body = [];
    postBody.body.trim().split(" ").map((post) => {
        if(post.toString()[0] === 'a' || post.toString()[0] === 'A'){
            post = post.toString().slice(0, -3) + '*';
        }
        post_body.push(post);
    });
    return post_body.join(" ");
}


// postsDb.run('DROP TABLE posts', function(err){
//     if(err){
//         console.log(err);
//     }else {
//         console.log("Table Dropped");
//     }
// })
module.exports = {getPagingData, getPagination, filterPostData};