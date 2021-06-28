/*
'Playlists' - a hyperlinked playlist viewer
©2021 Keian Rao <keian.rao@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

document.getElementById("nojs").remove();

Vue.component('extlink', {
	props: [ 'link' ],
	template: `
		<a
				v-if="link"
				class='link' :href='link' target='_blank'>
			Open
			<span v-if="domain">({{ domain }})</span>
		</a>
	`,
	computed: {
		"domain": function() {
			var match = this.link.match(
				/(.*):\/\/(.*?)\/.*/
			);
			return (match) ? match[2] : null;
		}
	}
});

Vue.component('song', {
	props: [ 'song' ],
	template: `
		<div class='song'>
			<span class='left'>
				<h3 class='title'>{{ song.title }}</h3>
				<span class='artist'>{{ song.artist }}</span>
			</span>
			<span class='right'>
				<extlink :link='song.link' />
			</span>
		</div>
	`
});

Vue.component('playlist-info', {
	props: [ 'playlist' ],
	template: `
		<div class='playlist-info'>
			<template v-if="!editingName">
				<h1 class='name'>{{ playlist.name }}</h1>
				<button @click='startEditing'>Edit playlist name</button>
			</template>
			<template v-else>
				<label for='input-name'>Playlist name:</label>
				<input id='input-name' type='text' v-model='editedName' />
				<button @click='stopEditing(true)'>Save</button>
				<button @click='stopEditing(false)'>Cancel</button>
			</template>
		</div>
	`,
	data: function() {
		return {
			editingName: false,
			editedName: this.playlist.name
		};
	},
	methods: {
		"startEditing": function() {
			this.editedName = this.playlist.name;
			this.editingName = true;
		},
		"stopEditing": function(confirm) {
			if (confirm) this.playlist.name = this.editedName;
			this.editingName = false;
		},
	}
});

var app = new Vue({
	el: "#vue",
	data: {
		playlist: {
			name: 'French baroque',
			songs: [
				{
					title: "Allemande",
					artist: "Jean Philippe Rameau",
					link: "https://www.youtube.com/watch?v=nj3_C7tfEPI"
				},
				{
					title: "Les Festes Venitiennes",
					artist: "Andre Campra",
					link: "https://www.youtube.com/watch?v=CIZtJsYNk_0"
				},
				{
					title: "Les Barricades mysterieuses",
					artist: "Francois Couperin",
					link: "https://www.youtube.com/watch?v=avMIRubcGVY"
				},
				{
					title: "Marche pour la ceremonie des Turcs",
					artist: "Jean-Baptiste Lully",
					link: "https://www.youtube.com/watch?v=Sy-yugPw_X8"
				}
			]
		}
	},
	methods: {
		"inputSong": function() {
			const titleInput = document.getElementById("input-title");
			const artistInput = document.getElementById("input-artist");
			const linkInput = document.getElementById("input-link");
			var song = {
				title: titleInput.value,
				artist: artistInput.value,
				link: linkInput.value
			};
			if (!song.title || !song.artist || !song.link) {
				return;
				// We should be indicating an error..
			}
			this.playlist.songs.push(song);
			titleInput.value = "";
			artistInput.value = "";
			linkInput.value = "";
		},
		"loadSelectedFile": function() {
			const file = document.getElementById("load").files[0];
			const url = URL.createObjectURL(file);
			
			var req = new XMLHttpRequest();
			req.open("GET", url);
			req.onload = function() {
				var playlist = JSON.parse(req.responseText);
				// Again, we should show errors.
				this.playlist = playlist;
			}.bind(this);
			req.send();
			
			URL.revokeObjectURL(url);
		},
		"downloadFile": function() {
			const data = JSON.stringify(this.playlist);
			const url = URL.createObjectURL(new Blob([data]));
			
			var memoryAnchor = document.createElement("a");
			memoryAnchor.href = url;
			memoryAnchor.download = "playlist.json";
			// Makes the 'download' attribute exist, and
			// if it has a value it's taken as a filename suggestion.
			memoryAnchor.click();
			
			URL.revokeObjectURL(url);
			// Race condition? But it seems like the click did block.
		}
	}
});

