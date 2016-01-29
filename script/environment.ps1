$version = '3.3.1'
$arch = 'x64'

$iojs = (get-psprovider filesystem).Home + '\virtualenv\iojs\' + $version + '\' + $arch + '\iojs.exe'


$name = $MyInvocation.MyCommand.Name;
$path = $MyInvocation.MyCommand.Path;

If (Test-Path Alias:node) {
  Remove-Item alias:node
}
New-Alias node $iojs


function npm {
  . node ((get-psprovider filesystem).Home + '\virtualenv\iojs\' + $version + '\' + $arch  + '\npm\bin\npm-cli.js') $args
}

function node-gyp {
  . node ((get-psprovider filesystem).Home + '\virtualenv\iojs\' + $version + '\' + $arch  + '\npm\node_modules\node-gyp\bin\node-gyp.js') $args
}

function hexo {
  . node ((Split-Path -parent $path) + '\..\node_modules\hexo-cli\bin\hexo') $args
}

function hexo-page {
  Write-Host "Change to the page directory!"
  Push-Location -path ((Split-Path -parent $path) + '\..\page')
  . node 'node_modules\hexo\bin\hexo' $args
  Pop-Location
}
