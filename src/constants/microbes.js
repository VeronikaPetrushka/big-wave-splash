const microbes = [
    {
        name: 'Carlos',
        image: require('../assets/microbes/1.png'),
        level: '1',
        complexity: 'Easy',
        health: '100',
        deactivate: '15',
        vulnerability: 'No',
        teleportation: 'No',
        background: require('../assets/game/back/1.png'),
        levelTitle: require('../assets/game/levels/1.png'),
        award: 150
    },
    {
        name: 'Gregory',
        image: require('../assets/microbes/2.png'),
        level: '2',
        complexity: 'Easy',
        health: '500',
        deactivate: '20',
        vulnerability: 'Afraid of prolonged watering',
        teleportation: 'Yes',
        background: require('../assets/game/back/2.png'),
        levelTitle: require('../assets/game/levels/2.png'),
        award: 350
    },
    {
        name: 'Samuel',
        image: require('../assets/microbes/3.png'),
        level: '3',
        complexity: 'Medium',
        health: '750',
        deactivate: '15',
        vulnerability: 'Afraid of prolonged watering',
        teleportation: 'Yes',
        background: require('../assets/game/back/3.png'),
        levelTitle: require('../assets/game/levels/3.png'),
        award: 600
    },
    {
        name: 'Walker',
        image: require('../assets/microbes/4.png'),
        level: '4',
        complexity: 'Hard',
        health: '1500',
        deactivate: '20',
        vulnerability: 'Afraid of prolonged watering',
        teleportation: 'Yes',
        background: require('../assets/game/back/4.png'),
        levelTitle: require('../assets/game/levels/4.png'),
        award: 2000
    },
    {
        name: 'Rowter',
        image: require('../assets/microbes/5.png'),
        level: '5',
        complexity: 'Very Hard',
        health: '5000',
        deactivate: '15',
        vulnerability: 'No',
        teleportation: 'Yes',
        background: require('../assets/game/back/5.png'),
        levelTitle: require('../assets/game/levels/5.png'),
        award: 5000
    },
];

export default microbes;