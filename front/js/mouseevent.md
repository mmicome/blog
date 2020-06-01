mouseenter  当内层div绝对定位到a 元素之外时， 鼠标在 div 上不触发mouseenter, 既div 不显示
mouseover   当内层div绝对定位到a 元素之外时， 鼠标在 div 上  触发mouseover,    既div 显示

        <a target="_blank" href="javascript:void(0)" class="m">XXXXX
            <div class="list" style="display: none;">
                <ul class="b col-md-4">1232</ul>
                <ul class="l col-md-8">1355</ul>
            </div>
        </a>
        
        .list {
            position: absolute;
            min-height: 500px;
            top: 80px;
        }
        
        $(function () {
            $('.m').on("mouseover", function (e) {
                $('div.list').show();
            }).on("mouseout", function (e) {
                $('div.list').hide();
            });
        });
