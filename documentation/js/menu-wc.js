'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">user-service documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-ffc43532d54544311c08e32cec3a8db6ce43123930eae74e789073ec06c5ed6869f6f7bad1a1b7ed53aa7ea36fc42b8f4a872456a596ce39e3504cdc968f9750"' : 'data-bs-target="#xs-controllers-links-module-AppModule-ffc43532d54544311c08e32cec3a8db6ce43123930eae74e789073ec06c5ed6869f6f7bad1a1b7ed53aa7ea36fc42b8f4a872456a596ce39e3504cdc968f9750"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-ffc43532d54544311c08e32cec3a8db6ce43123930eae74e789073ec06c5ed6869f6f7bad1a1b7ed53aa7ea36fc42b8f4a872456a596ce39e3504cdc968f9750"' :
                                            'id="xs-controllers-links-module-AppModule-ffc43532d54544311c08e32cec3a8db6ce43123930eae74e789073ec06c5ed6869f6f7bad1a1b7ed53aa7ea36fc42b8f4a872456a596ce39e3504cdc968f9750"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-ffc43532d54544311c08e32cec3a8db6ce43123930eae74e789073ec06c5ed6869f6f7bad1a1b7ed53aa7ea36fc42b8f4a872456a596ce39e3504cdc968f9750"' : 'data-bs-target="#xs-injectables-links-module-AppModule-ffc43532d54544311c08e32cec3a8db6ce43123930eae74e789073ec06c5ed6869f6f7bad1a1b7ed53aa7ea36fc42b8f4a872456a596ce39e3504cdc968f9750"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ffc43532d54544311c08e32cec3a8db6ce43123930eae74e789073ec06c5ed6869f6f7bad1a1b7ed53aa7ea36fc42b8f4a872456a596ce39e3504cdc968f9750"' :
                                        'id="xs-injectables-links-module-AppModule-ffc43532d54544311c08e32cec3a8db6ce43123930eae74e789073ec06c5ed6869f6f7bad1a1b7ed53aa7ea36fc42b8f4a872456a596ce39e3504cdc968f9750"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-a125f8a35a81a7fb9344db109df86595c26ec0a132fc793477301972732064817b4dbb9969296b3b5530d435463845e968eba34290c4d32962dd98ad17e3d738"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-a125f8a35a81a7fb9344db109df86595c26ec0a132fc793477301972732064817b4dbb9969296b3b5530d435463845e968eba34290c4d32962dd98ad17e3d738"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-a125f8a35a81a7fb9344db109df86595c26ec0a132fc793477301972732064817b4dbb9969296b3b5530d435463845e968eba34290c4d32962dd98ad17e3d738"' :
                                            'id="xs-controllers-links-module-AuthModule-a125f8a35a81a7fb9344db109df86595c26ec0a132fc793477301972732064817b4dbb9969296b3b5530d435463845e968eba34290c4d32962dd98ad17e3d738"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-a125f8a35a81a7fb9344db109df86595c26ec0a132fc793477301972732064817b4dbb9969296b3b5530d435463845e968eba34290c4d32962dd98ad17e3d738"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-a125f8a35a81a7fb9344db109df86595c26ec0a132fc793477301972732064817b4dbb9969296b3b5530d435463845e968eba34290c4d32962dd98ad17e3d738"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-a125f8a35a81a7fb9344db109df86595c26ec0a132fc793477301972732064817b4dbb9969296b3b5530d435463845e968eba34290c4d32962dd98ad17e3d738"' :
                                        'id="xs-injectables-links-module-AuthModule-a125f8a35a81a7fb9344db109df86595c26ec0a132fc793477301972732064817b4dbb9969296b3b5530d435463845e968eba34290c4d32962dd98ad17e3d738"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabaseModule-60747f612f82966e271ffd6f48d6c59a2ce9366bbc29f29329059599dfab137a37a476e2a4560d7b4265da7fe8b2ab488470fe0cef23e037e8c93030bbaf53f1"' : 'data-bs-target="#xs-injectables-links-module-DatabaseModule-60747f612f82966e271ffd6f48d6c59a2ce9366bbc29f29329059599dfab137a37a476e2a4560d7b4265da7fe8b2ab488470fe0cef23e037e8c93030bbaf53f1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabaseModule-60747f612f82966e271ffd6f48d6c59a2ce9366bbc29f29329059599dfab137a37a476e2a4560d7b4265da7fe8b2ab488470fe0cef23e037e8c93030bbaf53f1"' :
                                        'id="xs-injectables-links-module-DatabaseModule-60747f612f82966e271ffd6f48d6c59a2ce9366bbc29f29329059599dfab137a37a476e2a4560d7b4265da7fe8b2ab488470fe0cef23e037e8c93030bbaf53f1"' }>
                                        <li class="link">
                                            <a href="injectables/DatabaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-9dd01a57313464c0e7d9a22c0248eef417045b18645a019408a117b3df8d10eb272fa3d17f7e6663ba25ffb22139ba8516139c70c5ae469b80f7f7b40e952bfa"' : 'data-bs-target="#xs-controllers-links-module-UserModule-9dd01a57313464c0e7d9a22c0248eef417045b18645a019408a117b3df8d10eb272fa3d17f7e6663ba25ffb22139ba8516139c70c5ae469b80f7f7b40e952bfa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-9dd01a57313464c0e7d9a22c0248eef417045b18645a019408a117b3df8d10eb272fa3d17f7e6663ba25ffb22139ba8516139c70c5ae469b80f7f7b40e952bfa"' :
                                            'id="xs-controllers-links-module-UserModule-9dd01a57313464c0e7d9a22c0248eef417045b18645a019408a117b3df8d10eb272fa3d17f7e6663ba25ffb22139ba8516139c70c5ae469b80f7f7b40e952bfa"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-9dd01a57313464c0e7d9a22c0248eef417045b18645a019408a117b3df8d10eb272fa3d17f7e6663ba25ffb22139ba8516139c70c5ae469b80f7f7b40e952bfa"' : 'data-bs-target="#xs-injectables-links-module-UserModule-9dd01a57313464c0e7d9a22c0248eef417045b18645a019408a117b3df8d10eb272fa3d17f7e6663ba25ffb22139ba8516139c70c5ae469b80f7f7b40e952bfa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-9dd01a57313464c0e7d9a22c0248eef417045b18645a019408a117b3df8d10eb272fa3d17f7e6663ba25ffb22139ba8516139c70c5ae469b80f7f7b40e952bfa"' :
                                        'id="xs-injectables-links-module-UserModule-9dd01a57313464c0e7d9a22c0248eef417045b18645a019408a117b3df8d10eb272fa3d17f7e6663ba25ffb22139ba8516139c70c5ae469b80f7f7b40e952bfa"' }>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthDTO.html" data-type="entity-link" >AuthDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDTO.html" data-type="entity-link" >UserDTO</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabaseService.html" data-type="entity-link" >DatabaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});