# Fat Radiant

This is a standard installation of radiant, with all the extensions we normally use to support the kind of participative site we normally make, and some rake tasks that speed up the creation of a new site. It might possibly be useful to other people so I've made it open, but it's not your standard blog installation and you probably don't need this much stuff.

## Purpose

This is a way of consolidating all our site code into a standard install, with the useful side-effect of imposing a strong separation of content: if it's not platform, it has to come from the database. Stylesheets and javascripts are therefore a mixture of standard libraries (in the filesystem) and local extensions (from the database, delivered with the right content-type), and there can be no site-specific code in the filesystem. It's a pain sometimes, but it makes deployment, upgrades and code-transfer much easier, and when you're running multi-sited it gives you proper site-separation.

Note that this means any images referred to in your stylesheets have to be uploaded as assets. Since you also have to edit your stylesheets through the admin interface, you can do this with the inline uploader in the usual way.

## Installation

1. Check this out:

	git clone git://github.com/spanner/radiant_platform.git your_site_name

2. Get the submodules

	git submodule init
	git submodule update
	
3. Add a few site-specific files. There are (or will be soon) anonymised templates for each of these included in the distribution:

	* config/database.yml
	* config/deploy.rb
	* config/nginx.conf (or whatever front-end server you're using)
	* public/robots.txt
	* public/favicon.ico

4. Bootstrap the database (and choose 'empty', probably)

	rake db:bootstrap
	
5. Migrate the extensions

	rake radiant:platform:migrate

6. Update all the extensions.

	rake radiant:platform:update

### Bootstrapping a new site

I'm working on a rake task that will give you a working empty site to build from. Any thoughts or suggestions are very welcome.

## Importing an existing site

Much the same as the installation described above. You should still be able to run `rake radiant:platform:migrate`. Simply migrating extensions will probably fail because of the dependencies between them (the platform:migrate task just runs them in the right order).

### Moving site-specific material into the database

No rocket science here: you need to take any site-specific images, stylesheets and javascripts present as files and recreate them in the database. This will involve empty layouts for scripts and styles, with the right content-types, probably some uploading of the images you use for page furniture and then the dull but easy replacement of any image references in your stylesheets.

## Contact

Any questions, contact Will on will at spanner dot org.