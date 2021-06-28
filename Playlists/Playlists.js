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
				/(.*):\/\/(.*?\.)?(.*)\/.*/
			);
			return (match) ? match[3] : null;
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

var app = new Vue({
	el: "#root",
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
	}
});

/*
We need CRUD functionality..!
This page has little reason to exist otherwise..
*/
