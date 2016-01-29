




1. Das Archiv emerald.zip heruntergeladen.
2. Das Archiv entpackt und meinen **lokalen** TeX-Baum kopiert.


find the **local** tex-tree by opening `TeX Live command-line`. You can find it in your programm folder.

    kpsewhich -var-value=TEXMFLOCAL
    >> C:/texlive/texmf-local

now run `mktexlsr` inside the console to inform TeX Live about the new font.

lastly make the fonts available:

    updmap-sys --enable Map=emerald.map
and re-run `mktexlsr`
