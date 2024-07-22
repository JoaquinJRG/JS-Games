/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      fontFamily: {
        
      },
			colors: {
        primary: "#3B52A4",
        secundary: "#7AFF77"
      },
      boxShadow: {
        primary: "5px 5px 0px 0px rgba(59,82,164,1)",
        secundary: "5px 5px 0px 0px #7AFF77",
      }
		},
	},
	plugins: [],
}
