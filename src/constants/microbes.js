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
        levelTitle: require('../assets/game/levels/1.png')
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
        levelTitle: require('../assets/game/levels/2.png')
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
        levelTitle: require('../assets/game/levels/3.png')
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
        levelTitle: require('../assets/game/levels/4.png')
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
        levelTitle: require('../assets/game/levels/5.png')
    },
];

export default microbes;