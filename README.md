# GPEI-TK
Toolkit for c4d training within the Global Polio Eradication Initiative ( GPEI )

### Up and Running
###### Mac OS X
You will need Ruby, and PostgreSQL installed prior. I would recommend installing rbenv and ruby-builder to handle your ruby environment:
```
rbenv install 2.5.1
rbenv global 2.5.1
```
After having install ruby you will need to install a gem "bundle" to install all dependencies in the application.
```
cd gpei-tk
gem install bundle
```

To install postgreSQL this is the method used by the developers to do so:
```
brew install postgresql
```

Next clone this repo and install the project dependencies:
```
git clone https://github.com/unicef/gpei-tk.git && cd gpei-tk
bundle install
```

Running the server locally:
```
puma -vC "-"
```
