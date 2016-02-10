var catData = {};
var initCatModel = function(){
	catData = {
		'cat1' : { 
			'name' : 'Fluffy', 
			'clickcount': 0,
			'imgurl' : 'http://www.referralsaasquatch.com/assets/cute-cat.jpg'
		},
		'cat2' : { 
			'name' : 'Scuffy', 
			'clickcount': 0,
			'imgurl' : 'http://www.mycatnames.com/wp-content/uploads/2015/09/Great-Ideas-for-cute-cat-names-2.jpg'
		},
		'cat3' : { 
			'name' : 'Muuffy', 
			'clickcount': 0,
			'imgurl' : 'http://cdn.cutestpaw.com/wp-content/uploads/2011/11/cute-cat.jpg'
		},
		'cat4' : { 
			'name' : 'Luussy', 
			'clickcount': 0,
			'imgurl' : 'http://www.thedailyindia.in/wp-content/uploads/2016/01/cute-kitty-wallpapers-for-whats-app-dp.jpg'
		},
		'cat4' : { 
			'name' : 'Crusty', 
			'clickcount': 0,
			'imgurl' : 'http://freephotos.atguru.in/hdphotos/cat-wallpapers/funny-cat.jpg'
		}
	};
	return true;
};

var initView = function() {
	var listDiv = document.getElementById('listDiv');
	for (var i in catData) {
		listDiv.innerHTML += '<div onClick="initController(\''+ i +'\')"><img class="thumb" src="'+ catData[i].imgurl +'" /><div>'
	}
};



var initController = function(args) {
	if(args) {
		var displaydiv = document.getElementById('displaydiv');
		catData[args].clickcount++;
		(function() {
			displaydiv.innerHTML = '';
			displaydiv.innerHTML = '<div>' + '<div>'+ catData[args].name + '</div>' + '<img class="mainC" src="'+ catData[args].imgurl +'" />' + '<div>'+ catData[args].clickcount + '</div>' + '</div>';
		})();
	} else {
		if(initCatModel()) {
			initView();
		}
	}
};
var onReady = function() {
	initController();
}