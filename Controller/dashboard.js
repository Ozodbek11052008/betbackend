const navbat = require("../Models/navbat");


module.exports = mainAdmin = {
  dashboard: async (req, res) => {
    // Aggregate query to group by 'service' and count occurrences
    navbat.aggregate([
      {
        $group: {
          _id: "$service",  // Group by the 'service' field
          count: { $sum: 1 } // Count the number of documents for each service
        }
      }
    ]).then(serviceCounts => {
      // Format data as an object { "Dental Cleaning": 3, "Dental surgery": 2, ... }
      const serviceData = serviceCounts.reduce((acc, service) => {
        acc[service._id] = service.count;
        return acc;
      }, {});

      res.render('admin/index', {
        layout: './layout/admin_layout',
        serviceCounts: serviceData
      })
    }).catch(err => {
      console.error(err);
    });

    //      await bookModel.aggregate([{
    //           $group: {
    //                _id: '$bookCategory',
    //                books: {


  }
}