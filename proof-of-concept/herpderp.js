(function () {
    'use strict';
    
    var users = ["twitter-name-goes-here"],
        derps = ["herp", "derp"];

    function herpifyWord(word) {
	if (word.length < 4 || Math.random() > 0.8) {
	    return word;
	}
	var randomDerp = Math.floor(Math.random() * (derps.length));
	if (word.indexOf("#") == 0) {
	    return "#" + derps[randomDerp];
	}
	return derps[randomDerp];
    }

    function herpifyNode(tweet) {
	var replacements = tweet.replace(/(\b[\w-]+)/gi, herpifyWord);
	return replacements;
    }

    function herpifyTweet(tweetNodes) {
	var tweetArray = Array.prototype.slice.call(tweetNodes);
	return tweetArray.map(function(node) {
	    if (typeof node.innerText == 'undefined') {
		node.data = herpifyNode(node.data, false);
	    } else {
		node.innerText = herpifyNode(node.innerText, true);
	    }
	    return node;
	});
    }

    function herpifyStream(rootElement) {
	var tweets = document.getElementsByClassName("tweet");
	var tweetArray = Array.prototype.slice.call(tweets);
	tweetArray.forEach(function(tweet) {
	    if (users.indexOf(tweet.getAttribute("data-screen-name")) >= 0) {
		var tweetContent = tweet.getElementsByClassName("js-tweet-text")[0];
		tweetContent.childNodes = herpifyTweet(tweetContent.childNodes);
	    }
	});
    }

    function observeStream() {
	var tweetStream = document.getElementById("stream-items-id");
	var observer = new WebKitMutationObserver(function(mutations) {
	    mutations.forEach(function(mutation) {
		for (var i = 0; i < mutation.addedNodes.length; i++) {
		    var node = mutation.addedNodes[i];
		    herpifyStream(node);
		}
	    });
	});
	observer.observe(tweetStream, { childList: true });
    }

    herpifyStream(document);
    observeStream();
})();
