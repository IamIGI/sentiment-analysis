import type { AnalysisResultDesc } from '$lib/interfaces';

const sentimentAnalysis: Record<string, AnalysisResultDesc> = {
	good: {
		iconName: 'good.svg',
		color: '#507c5c',
		title: 'Pozytywny sentyment',
		desc: 'Świetnie! Twój tekst wywołuje pozytywne emocje.<br/><b>Pro tip:</b> Dodaj jeszcze więcej konkretów, by wzmocnić przekaz!'
	},
	neutral: {
		iconName: 'neutral.svg',
		color: '#ffc61b',
		title: 'Neutralny sentyment',
		desc: 'Twój tekst jest neutralny.<br/><b>Pro tip:</b> Możesz dodać więcej emocjonalnych słów, by nadać mu wyrazistości.'
	},
	bad: {
		iconName: 'bad.svg',
		color: '#b3404a',
		title: 'Negatywny sentyment',
		desc: 'Twój tekst może być odbierany jako negatywny.<br/><b>Pro tip:</b> Spróbuj użyć bardziej pozytywnego języka lub złagodzić ton.'
	}
};

export default sentimentAnalysis;
