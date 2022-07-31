//? Aliases
const userCardTemplate = document.querySelector('[data-user-template]');
const usersCardContainer = document.getElementById('main');
const searchInput = document.getElementById('search-input');
const databases = document.querySelector('[databases]');
const settingsButton = document.getElementById('settings-button');
const settingsSide = document.getElementById('settings-side');
const usersCount = document.querySelector('[data-users-count]');
const montadarTitle = document.querySelector('[data-title]');
const searchButton = document.querySelector('[data-search-button]');
const randomUserContainer = document.querySelector('[data-user-random-container]');

const init = {
	method: 'GET',
	headers: {'Content-Type': 'application/json'},
	mode: 'cors',
	cache: 'default'
};


databases.onchange = function(e) {
	for (let i = 0; i < this.children.length; i++) {
		if (this.children[i].checked === true) {
			const file = new Request(`./database/${this.children[i].id}.json`, init);

			searchInput.oninput = function(e) {
				const value = this.value.toLowerCase();
		
				for (var i = 0; i < usersCardContainer.children.length; i++) {
					const userName = usersCardContainer.children[i].querySelector('[data-user-name]').textContent;
					const userLevel = usersCardContainer.children[i].querySelector('[data-user-level]').textContent;
					const isVisible = userName.toLowerCase().includes(this.value.toLowerCase()) || userLevel.toLowerCase().includes(this.value.toLowerCase());
					isVisible === true? usersCardContainer.children[i].style.display = 'flex' : usersCardContainer.children[i].style.display = 'none';
				}
				
			}
		
			fetch(file)
			.then( (resp) => resp.json())
			.then( (data) => {
				data.students.map( (user) => {
					const card = userCardTemplate.content.cloneNode(true).children[0];
					const name = card.querySelector('[data-user-name]');
					const level = card.querySelector('[data-user-level]');
					name.textContent = user.name;
					level.textContent = user.level;
					usersCardContainer.append(card);
				});

				usersCount.textContent = usersCardContainer.children.length;
				usersCardContainer.style.height = 'auto';
			});

		} else {
			usersCardContainer.innerHTML = '';
			usersCardContainer.children.length = 0;
			usersCardContainer.style.height = '100vh';
			usersCount.textContent = usersCardContainer.children.length;
		};
	}
}



settingsButton.onclick = function() {
	settingsSide.style.display = 'flex';

	main.onclick = function() {
		settingsSide.style.display = 'none';
	}
}




montadarTitle.onclick = function() {
	if (usersCardContainer.style.display === 'none') {
		randomUserContainer.style.display = 'none';
		usersCardContainer.style.display = 'flex';
	} else {
		return;
	}
}

searchButton.onclick = function() {
	if (usersCardContainer.children.length > 0) {
		const randomUser = usersCardContainer.children[Math.floor(Math.random() * usersCardContainer.children.length)];

		usersCardContainer.style.display = 'none';
		randomUser.style.transform = 'scale(3)';
		randomUserContainer.innerHTML = '';
		randomUserContainer.appendChild(randomUser);
		randomUserContainer.style.display = 'flex';

		console.log(randomUserContainer);

	} else {
		console.log('The list is empty!');
	}
}