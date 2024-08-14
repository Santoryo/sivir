export async function load({params, fetch}) {

    const temp = await fetch(`/api/champions/key~'${params.id}'||name~'${params.id}'`);
    const data = await temp.json();
    const champion = data[0];
    return champion
}