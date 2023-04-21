import Component from "../../../component";
import { Store } from "../../../../js/store/store2";
import template from "./content-part.html"
import info from "../info-part/info-part.html"
import zero from "../zero-part/zero-part.html"

export default class MenuContentPart extends Component {
    async mount(modalData) {
        const { isMobile, anchor, dialogRef } = modalData
        await super.mount({
            anchor,
            template
        })

        if (isMobile) {
            this.find('#asTaras').remove()
        } else {
            let asTarasB = localStorage.getItem('asTaras') == 1 ? true : false
            const toggle = this.find('#asTarasToggle')
            asTarasB && toggle.setAttribute('checked', 'true')
            asTarasB || toggle.removeAttribute('checked')

            toggle.addEventListener('change', () => {
                asTarasB = !asTarasB
                localStorage.setItem('asTaras', asTarasB ? 1 : 0)
                setTimeout(() => Store.mut('asTaras', asTarasB), 500)
            })
        }

        const backBtn = dialogRef.find('#backBtn').querySelector('svg')
        const title = dialogRef.find('#menuTitle')
        const content = this.find('#menuContent')
        
        const infoItem = this.find('#infoItem')
        infoItem.addEventListener('click', async () => {
            backBtn.style.display = 'block'
            title.innerText = 'Інформація'
            content.innerHTML = info
        })

        const zeroItem = this.find('#zeroItem')
        zeroItem.addEventListener('click', async () => {
            backBtn.style.display = 'block'
            title.innerText = 'Стани Zero-Point'
            content.innerHTML = zero
        })
    }
}
