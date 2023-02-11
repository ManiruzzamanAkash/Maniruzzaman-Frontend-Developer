# Maniruzzaman-Frontend-Developer

WordPress Fullstack plugin developmennt - Gutenberg block, REST API, and so many...

---

## Demo Video
--will be added here---

## Demo Screenshots

**Capsule List In Block Editor - Text label settings**

![Capsule List Editor-01](https://i.ibb.co/QfHkH6G/01-plugin-editor-1.png)

**Capsule List In Block Editor - Color settings**

![Capsule List Editor-02](https://i.ibb.co/4gSpJ0g/02-plugin-editor-2.png)

**Frontend - Capsule List with filtering+pagination**

![Capsule List Editor-02](https://i.ibb.co/5rdSnbF/03-capsule-list-frontend-01.png)

**Frontend - Capsule detail popup**

![Capsule detail popup](https://i.ibb.co/2n0TWHB/04-capsule-detail-popup.png)

**Frontend - No capsuel found**

![Frontend - No capsuel found](https://i.ibb.co/44tTJrm/05-no-capsule-list.png)

**Frontend - Mobile responsive view**

![Frontend - Mobile responsive view](https://i.ibb.co/FghKMSg/06-mobile-view.png)



## Local development Setup Instruction

### Requirements:
1. Composer >= `v2`
1. PHP >= `7.4`
1. WordPress version >= `5.8`

**Clone repository**
```bash
git clone https://github.com/ManiruzzamanAkash/Maniruzzaman-Frontend-Developer.git
```

**Go to folder and install composer**
```bash
cd Maniruzzaman-Frontend-Developer
composer install
```

**Npm dependencies**
```bash
npm i
npm start
```

## Start plugin
Active the plugin from your `/wp-admin/plugins.php`.

## Plugin Flow
1. Add a post from `wp-admin/post-new.php`.
1. Search Gutenberg block `Spacex data`..
1. Insert that block.
1. Give some setting value, like - 
   - Search text label
   - Pagination Previous text label
   - Pagination Next text label
1. Change impact instantly on the editor. [For editor, set the limit to 2].
1. Visit the post details in frontend.
1. Check the filtering by status, type, mission.
1. Check the pagination.
1. Check the detail of capsule in a modal.

## Testing
1. PHPCS
1. PHPUnit Testing
1. Jest Unit Testing
1. e2e Testing (Snapshot testing)

## PHPCS

**PHPCS Checking**
```bash
composer run phpcs
```

**Fix PHPCS**
```bash
composer run phpcbf
```
## PHP Unit test

**PHPUnit test running**
```bash
composer run test
```

**PHPUnit test with PHPCS**
```bash
composer run test:all
```

## Jest Unit test
```bash
npm run test:unit
```

## PHPUnit test result
![Run PHPUnit Test suits](https://i.ibb.co/hdnB56H/phpunit-test.png)


### Jest Unit Test Result

![Run Test suits](https://i.ibb.co/0hnSvsd/jest-unit-test-result.png)



## e2e Test

### Requirements for e2e test

1. Need to install docker on local machine. I've used `wp-env` package to install WordPress docker setup. 
You can follow this - https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/
2. Commands to start from here - 
```bash
npm i -g @wordpress/env --save-dev
wp-env start
```
If everything is successfull, you'll see something like this - 
```bash
WordPress development site started at http://localhost:8888/
WordPress test site started at http://localhost:8889/
MySQL is listening on port 59087
MySQL for automated testing is listening on port 59085
```

### Start e2e testing

```bash
npm run test:e2e
```

### e2e Test Result
Added in Video.

## Plugin zip and release commands -

```bash
# Build plugin
npm run build
```

```bash
# Make i18n localization
npm run makepot
```

```bash
# Create plugin zip
npm run zip
```

```bash
# Release plugin = npm run build + makepot + zip
npm run release
```

## Known issue
For fetching capsules, use this API - https://docs.spacexdata.com/#00ac651a-8ba2-4b4c-858a-4034dd1254fa.

Here, there is a property called `limit` which doesn't work as expected and so some inconsitance with **Pagination** coud be found. But it's totally depend on the **Spacex server**.
