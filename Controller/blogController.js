const blogModdel = require("../Models/blog")

const blog = {

    createBlog: async (req, res) => {
        const {  url, title , description } = req.body;

        console.log(req.body);
        const blogDB = new blogModdel({
           url, title, description
        })
        await blogDB.save()
            .then(data => res.redirect("/blogs"))
            .catch(err => res.send(err))
    },
    getBlog: async (req, res) => {
      

        const blog = await blogModdel.find()
        res.render('admin/blog', {
            layout: './layout/admin_layout',
            blog
        })
    }
    ,
    deleteBlog: async (req, res) => {
        await blogModdel.findByIdAndDelete(req.params.id)
            .then(data => res.redirect("/blogs"))
            .catch(err => res.send(err))
    },
    getAddBlog: async (req, res) => {
      

      
        res.render('admin/add_blog', {
            layout: './layout/admin_layout',
        })
    },
    getJsonBlog: async (req, res) => {
      

      
         blogsjson =  await blogModdel.find()
        .then(data => res.send(data))
       
    },
    
}

module.exports = blog