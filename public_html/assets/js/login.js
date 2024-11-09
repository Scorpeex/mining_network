  const wax = new waxjs.WaxJS({
        rpcEndpoint: 'https://wax.greymass.com'
    });

    //automatically check for credentials
    autoLogin();

    //checks if autologin is available 
    async function autoLogin() {
        let isAutoLoginAvailable = await wax.isAutoLoginAvailable();
        if (isAutoLoginAvailable) {
            let userAccount = wax.userAccount;
            let pubKeys = wax.pubKeys;
            
        }
        else {
            
        }
    }

    //normal login. Triggers a popup for non-whitelisted dapps
    async function login() {
        try {
            //if autologged in, this simply returns the userAccount w/no popup
            let userAccount = await wax.login();
            let pubKeys = wax.pubKeys;
            
        } catch (e) {
            
        }
    } 

    async function sign() {
    if(!wax.api) {
        return;
    }

    try {
        const result = await wax.api.transact({
        actions: [{
            account: 'eosio',
            name: 'delegatebw',
            authorization: [{
            actor: wax.userAccount,
            permission: 'active',
            }],
            data: {
            from: wax.userAccount,
            receiver: wax.userAccount,
            stake_net_quantity: '0.00000001 WAX',
            stake_cpu_quantity: '0.00000000 WAX',
            transfer: false,
            memo: 'This is a WaxJS/Cloud Wallet Demo.'
            },
        }]
        }, {
        blocksBehind: 3,
        expireSeconds: 30
        });
        
    } catch(e) {
        
    }
    }
