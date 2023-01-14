export const onChangeInput = (root: HTMLElement, name: string, value: string) => {
    const input = root.querySelector(`input[id=${name}]`) as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event("input"));
    input.dispatchEvent(new Event("blur"));
}
