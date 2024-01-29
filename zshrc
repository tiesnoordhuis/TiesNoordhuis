# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="/home/ties/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="robbyrussell"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
# zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
# zstyle ':omz:update' frequency 13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# You can also set it to another string to have that shown instead of the default red dots.
# e.g. COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
# Caution: this setting can cause issues with multiline prompts in zsh < 5.7.1 (see #5765)
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
    git
    sudo
    nvm
    npm
    composer
    mvn
    zsh-autosuggestions
    zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Custom additions to path
path+=('/home/ties/.local/bin/')
path+=('/usr/share/dotnet')
export DOTNET_ROOT=~/.dotnet
export PATH=$PATH:$DOTNET_ROOT


# Alias
alias python=python3
alias sl="sl -e"
alias topp="bpytop"
alias chrome="google-chrome"
alias gpnb=gpsup
alias pyrs=pythonreviewstart
alias pyre=pythonreviewend
alias phprs=phpreviewstart
alias phpre=phpreviewend
alias cl=clonerepo

# Custom style
zstyle ':completion:*' completer _expand_alias _complete _ignored

# Functions
function clonerepo () {
    if (( $# == 0 ))
    then 
        echo no repository provided;
    else
        # https://stackoverflow.com/questions/59430224/git-clone-repo-and-all-branches-custom-function-in-zshrc-profile
        repoName=$1
        git clone "$repoName"
        regex='^git@git\.nexed\.com:[0-9a-z-]+\/[0-9a-z-]+\/(.+)\.git$'
        [[ $repoName =~ $regex ]] || return
        dirName=$match[1]
        echo "\ncd: changing director to $dirName\n"
        cd "$dirName"
        echo "ls: listing files in directory\n"
        ls
        echo "\n"
    fi
}
function removerepo () {
    if [[ -f "$PWD/.git/HEAD" ]]
    then
        repodir=${PWD##*/}
        read -q "CONFIRM?do you want to delete the directory [$repodir] (y/[n])?"
        if [[ $CONFIRM = "y" ]]
        then
            cd ..
            rm -rf $repodir
        fi
    else
        echo "$PWD is not a repository"
    fi
}
function sqlreviewteardown () {
    docker stop mysql reviewsql phpmyadmin myadmin
    docker rm mysql reviewsql phpmyadmin myadmin
}
function sqlreviewsetup () {
    sqlreviewteardown
    # if 1 argument provided, use that as exportfile, else use import.sql
    if (( $# == 1 ))    
    then 
        exportfile="$PWD/$1"
    else
        exportfile="$PWD/import.sql"
    fi
    if [[ -f $exportfile ]]
    then
        tempexportfile="$PWD/importtemp.sql"
        cp $exportfile $tempexportfile
        echo ";\nGRANT ALL PRIVILEGES ON *.* TO 'bit_academy'@'%';" >> $tempexportfile
        docker run --name reviewsql --mount type=bind,source=$tempexportfile,destination=/docker-entrypoint-initdb.d/a.sql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=toor -e MYSQL_USER=bit_academy -e MYSQL_PASSWORD=bit_academy -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
        rm $tempexportfile
    else
        docker run --name reviewsql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=toor -e MYSQL_USER=bit_academy -e MYSQL_PASSWORD=bit_academy -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    fi
    docker run --name myadmin -d --link reviewsql:db -p 8082:80 phpmyadmin
    docker ps
}
function pythonreviewpipsetup () {
    python -m venv review
    source ./review/bin/activate
    requirementsfile="$PWD/requirements.txt"
    if [[ -f requirementsfile ]]
    then
        sed -i '/win32/d' ./requirements.txt
        sed -i '/winpty/d' ./requirements.txt
        pip install -r requirements.txt
    elif [[ -n *ipynb(#qN) ]]
    then
        pip install pandas matplotlib notebook seaborn
        pip freeze > requirements.txt
    fi
    if grep -q notebook "$requirementsfile"
    then
        jupyter notebook
    fi
}
function pythonreviewstart () {
    if (( $# == 0 ))
    then 
        echo usage: pythonreviewstart repository
    else
        clonerepo "$1"
        pythonreviewpipsetup
    fi
}
function pythonreviewend () {
    deactivate
    removerepo
}
function phpreviewstart () {
    if (( $# == 0 ))
    then 
        echo usage: phpreviewstart repository
    else
        clonerepo "$1"
        sqlreviewsetup
        sed -i -- 's/localhost/127.0.0.1/g' **/*.php(D.)
        google-chrome http://localhost:8000
        php -S localhost:8000
    fi
}
function phpreviewend () {
    removerepo
}
function laravelreviewstart () {
    if [[ -f "$PWD/.env.example" && -f "$PWD/composer.json" ]]
    then
        composer install
        cp .env.example .env
        sed -i 's/DB_USERNAME=.*/DB_USERNAME=bit_academy/' .env
        sed -i 's/DB_PASSWORD=.*/DB_PASSWORD=bit_academy/' .env
        if [[ -f "$PWD/import.sql" ]]
        then
            echo using excisting import.sql
        else
            echo create import.sql
            touch import.sql
            gawk 'match($0, /DB_DATABASE=(.+)/, a) {print "CREATE DATABASE " a[1] ";"}' .env.example > import.sql
        fi
        sqlreviewsetup
        google-chrome http://localhost:8000
        php artisan serve
    else
        echo "No .env.example or composer.json present, are you in a laravel repository?"
    fi
}
