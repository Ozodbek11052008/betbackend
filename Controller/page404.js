
module.exports = errorPage = {
     page404: async (req, res) => {
        
          res.render('admin/page404', {
               layout:false
              
          })
  
     },

   

}
