# GPEI-TK
Toolkit for c4d training within the Global Polio Eradication Initiative ( GPEI )

# Up and Running
## Mac
You will need Ruby 2.3.0, and PostgreSQL installed prior. If you are using rbenv to handle your ruby environment:
```
rbenv install 2.3.0
rbenv global 2.3.0
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

```
rails s
```
