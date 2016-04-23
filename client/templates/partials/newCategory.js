Template.newCategory.events({
	"submit #new-category-form": function(e){
		e.preventDefault();
		var category = e.target.newCategoryName.value;
		if(category === ""){
			alert("category name must be entered");
			return;
		}else{
			console.log(category);
			Meteor.call("createNewCategory",category);
			$("#category-modal").modal("toggle");
		}
	}
});
