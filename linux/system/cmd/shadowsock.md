# install env

    apt-get install python-pip
    pip install git+https://github.com/shadowsocks/shadowsocks.git@master

## config shadowsocks.json

    cd /etc
    sudo touch shadowsocks.json

**Example: shadowsocks.json**:

    {
        "server":"my_server_ip",
        "server_port":8388,
        "local_address": "127.0.0.1",
        "local_port":1080,
        "password":"mypassword",
        "timeout":300,
        "method":"aes-256-cfb",
        "fast_open": false
    }

    server	the address your server listens
    server_port	server port
    local_address	the address your local listens
    local_port	local port
    password	password used for encryption
    timeout	in seconds
    method	default: "aes-256-cfb", see Encryption
    fast_open	use TCP_FASTOPEN, true / false
    workers	number of workers, available on Unix/Linux

## To run in the background:

sslocal -c /etc/shadowsocks.json -d start
sslocal -c /etc/shadowsocks.json -d stop
sslocal -c /home/icome/.shadowsocks.json -d restart

## chrome安装插件 SwitchyOmega

    规则列表链接:　https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt